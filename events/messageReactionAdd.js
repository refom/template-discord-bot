const { MessageReaction, User } = require('discord.js');
const logger = require('../modules/logger.js');
const permission = require('../handler/PermissionHandler');

const obj = {
	/** 
	 * @param { MessageReaction } reaction
	 * @param { User } user
	 */
	async run(reaction, user) {
		if (reaction.partial) {
			try {
				await reaction.fetch();
			} catch (error) {
				logger.error(`Something went wrong when fetching the message: ${error}`);
				return;
			}
		}

		const { reactions } = reaction.client.container;
		const react = reactions.get(reaction.emoji.name);
		if (!react) return;

		if (!permission.check(react.conf.permission, user)) return;

		try {
			await react.run(reaction, user);
		} catch (error) {
			logger.error(`Something went wrong when run the reaction: ${error}`);
		}
	}
};

module.exports = obj;
