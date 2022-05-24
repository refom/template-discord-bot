
const { User } = require('discord.js');
const logger = require('../modules/logger.js');
const permConfig = require('./permission.json');
require('dotenv').config();

// ===== Permission Handler
const handler = {
	/**
	 * @param {string} permission
	 * @param {User} user
	 */
	check(permission, user) {
		const perm = permission.toLowerCase();
		
		if (perm == "user") return true;
		
		if (perm == "owner") {
			logger.warn(`Owner Permission Dipakai oleh ${user.id}`);
			return (process.env.OWNER == user.id);
		}
		
		if (permConfig[perm]) {
			logger.warn(`${perm} Permission Dipakai oleh ${user.id}`);
			return permConfig[perm].includes(user.id);
		}

		return false;
	}
};

module.exports = handler;
