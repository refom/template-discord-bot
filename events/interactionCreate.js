const { Interaction } = require('discord.js');
const logger = require('../modules/logger.js');
const permission = require('../handler/PermissionHandler');

const obj = {
	/** @param { Interaction } interaction */
	async run(interaction) {
		// Check if it's command
		if (!interaction.isCommand()) return;

		// Get the name and check undefined
		const { commands } = interaction.client.container;
		const command = commands.get(interaction.commandName);
		if (!command) return;

		// Check permission
		if (!permission.check(command.conf.permission, interaction.user)) {
			await interaction.reply({ content: 'You don\'t have permission to use this!', ephemeral: true });
			return;
		}

		// Run command
		try {
			await command.run(interaction);
		}
		catch (error) {
			logger.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
};

module.exports = obj;
