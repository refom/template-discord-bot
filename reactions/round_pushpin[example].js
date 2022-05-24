
const { MessageReaction, User } = require('discord.js');
const logger = require('../../modules/logger');

const obj = {
	name: '📍',
	description: 'send message to pin channel',
	conf: {
		enable: false,
		permission: "user",
		guildOnly: false,
	},

	/** 
	 * @param { MessageReaction } reaction
	 * @param { User } user
	 */
	async run(reaction, user) {
		
	}
};

module.exports = obj;
