
const { Client, Collection } = require('discord.js');
const logger = require('../modules/logger.js');
const utils = require('../modules/utils.js');

/** @param { Client } client */
const handler = (client) => {
	// ===== Commands Register
	const path = require('path').resolve(__dirname, '../commands');
	const commandFiles = utils.getAllFiles(path);

	client.container.commands = new Collection();

	for (const file of commandFiles) {
		const command = require(file);

		if (command.conf?.enable) {
			logger.log(`Loading Slash Command: ${command.data.name}.`, "log");
			client.container.commands.set(command.data.name, command);
		}
	}
};

module.exports = handler;

