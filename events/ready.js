
const { Client } = require('discord.js');
const logger = require('../modules/logger.js');
const FeaturesHandler = require('../handler/FeaturesHandler.js');

const obj = {
	once: true,
	/** @param {Client} client */
	async run(client) {
		FeaturesHandler(client);
		logger.log(`${client.user.tag}, ready to serve ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users in ${client.guilds.cache.size} servers.`, 'ready');
	}
};

module.exports = obj;
