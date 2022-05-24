
const { Client } = require('discord.js');
const logger = require('../modules/logger.js');
const utils = require('../modules/utils.js');
const path = require('path');

/** @param { Client } client */
const handler = (client) => {
	// ===== Event Register
	const dirPath = path.resolve(__dirname, '../events');
	const eventFiles = utils.getAllFiles(dirPath);

	for (const file of eventFiles) {
		const event = require(file);

		const name = path.parse(file).name;
		logger.log(`Loading Event: ${name}.`, "log");
		if (event.once) {
			client.once(name, (...args) => event.run(...args));
		} else {
			client.on(name, (...args) => event.run(...args));
		}
	}
};

module.exports = handler;
