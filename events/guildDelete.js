
const { Guild } = require('discord.js');
const logger = require('../modules/logger.js');

const obj = {
	/** @param {Guild} guild */
	async run(guild) {
		if (!guild.available) return;

		logger.log(`[GUILD LEAVE] ${guild.id} removed the bot.`);
	}
};

module.exports = obj;
