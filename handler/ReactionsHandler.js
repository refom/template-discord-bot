
const { Client, Collection } = require('discord.js');
const logger = require('../modules/logger.js');
const utils = require('../modules/utils.js');
const path = require('path');

/** @param { Client } client */
const handler = (client) => {
	// ===== Reactions Register
	const dirPath = path.resolve(__dirname, '../reactions');
	const reactionFiles = utils.getAllFiles(dirPath);

	// client.container.reactions = new Collection();
	
	for (const file of reactionFiles) {
		const reaction = require(file);

		if (reaction.conf?.enable) {
			logger.log(`Loading Reaction: ${path.parse(file).name}.`, "log");
			client.container.reactions.set(reaction.name, reaction);
		}
	}
};

module.exports = handler;
