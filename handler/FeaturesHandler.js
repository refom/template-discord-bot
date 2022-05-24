
const { Client } = require('discord.js');
const logger = require('../modules/logger.js');
const utils = require('../modules/utils.js');
const path = require('path');

/** @param { Client } client */
const handler = (client) => {
	// ===== Features Register
	const dirPath = path.resolve(__dirname, '../features');
	const featureFiles = utils.getAllFiles(dirPath);
	
	for (const file of featureFiles) {
		const feature = require(file);
	
		if (feature.enable) {
			feature.Start(client);
			logger.log(`Loading Features: ${path.parse(file).name}.`, "log");
		}
	}
};

module.exports = handler;
