
const { Guild } = require('discord.js');
const logger = require('../modules/logger.js');

const obj = {
	/** @param {Guild} guild */
	async run(guild) {
		logger.log(`[GUILD JOIN] ${guild.id} added the bot. Owner: ${guild.ownerId}`);
	}
};

module.exports = obj;
