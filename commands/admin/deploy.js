
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const logger = require('../../modules/logger.js');

const obj = {
	conf: {
		enable: true,
		permission: "owner",
		guildOnly: true,
	},
	data: new SlashCommandBuilder()
		.setName('deploy')
		.setDescription('Deploy commands')
		.addSubcommand(subCommand =>
			subCommand
				.setName('guild')
				.setDescription('Deploy guild slash commands')
				.addStringOption(option =>
					option
						.setName('guild-id')
						.setDescription('Optional (Guild ID)'))
				.addBooleanOption(option =>
					option
						.setName('reset')
						.setDescription('Reset guild slash commands')))
		.addSubcommand(subCommand =>
			subCommand
				.setName('now')
				.setDescription('Deploy global slash commands'))
		.addSubcommand(subCommand =>
			subCommand
				.setName('reset')
				.setDescription('Reset global slash commands')),

	/** @param { CommandInteraction } interaction */
	async run(interaction) {
		await interaction.deferReply();
		await interaction.editReply("Started Refreshing Commands");

		const client = interaction.client;
		const subCommand = interaction.options.getSubcommand();

		// Get guild and global commands
		const [guildCmds, globalCmds] = client.container.commands.partition(c => c.conf.guildOnly);

		
		// ======= Deploying to global
		if (subCommand == 'now') {
			try {
				await client.application?.commands.set(globalCmds.map(c => c.data.toJSON()));
				await interaction.editReply("Successfully Deploy Global Commands");
				logger.cmd('Deploy Global Commands');
			} catch (error) {
				await interaction.editReply("Error When Deploy Global Commands");
				logger.error(`Error When Deploy Global Commands: ${error}`);
			}
			return;
		}

		// ======= Reset Global Commands
		if (subCommand == 'reset') {
			try {
				await client.application?.commands.set([]);
				await interaction.editReply("Successfully Reset Global Commands");
				logger.cmd('Reset Global Commands');
			} catch (error) {
				await interaction.editReply("Error When Reset Global Commands");
				logger.error(`Error When Reset Global Commands: ${error}`);
			}
			return;
		}


		if (subCommand == 'guild') {
			// Get guild ID from input or from config
			const guildId = interaction.options.getString('guild-id') || client.container.config.guilds[0];
			const reset = interaction.options.getBoolean('reset') || false;


			// ======= Reset Guild Commands
			if (reset) {
				try {
					await client.guilds.cache.get(guildId)?.commands.set([]);
					await interaction.editReply("Successfully Reset Guild Commands");
					logger.cmd(`Reset Guild Commands from guild id: ${guildId}`);
				} catch (error) {
					await interaction.editReply("Error When Reset Guild Commands");
					logger.error(`Error When Reset Guild Commands: ${error}`);
				}
				return;
			}
			
			// ======= Deploying to guild
			try {
				await client.guilds.cache.get(guildId)?.commands.set(guildCmds.map(c => c.data.toJSON()));
				await interaction.editReply("Successfully Deploy Guild Commands");
				logger.cmd(`Deploy Guild Commands to guild id: ${guildId}`);
			} catch (error) {
				await interaction.editReply("Error When Deploy Guild Commands");
				logger.error(`Error When Deploy Guild Commands: ${error}`);
			}
			return;
		}
	}
};

module.exports = obj;

