const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Message, ThreadChannel } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;


// Tested purpose
const obj = {
	conf: {
		enable: false,
		permission: "user",
		guildOnly: true,
	},
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Replies with Tested!')
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
						.setDescription('Reset guild commands')))
		.addSubcommand(subCommand =>
			subCommand
				.setName('resets')
				.setDescription('Reset global commands')),

	/** @param { CommandInteraction } interaction  */
	async run(interaction) {
		
	}
};

module.exports = obj;
