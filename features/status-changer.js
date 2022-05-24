const { Client } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const obj = {
	enable: true,
	/** @param { Client } client */
	async Start(client) {
		const { config } = client.container;
		const listStatus = config.bot.status;
		
		// wait time from config
		const waitTime = config.bot.statusDelay.reduce((total, value) => total * value, 1);
		let index = 0;

		const updateStatus = async () => {
			client.user.setPresence({
				activities: [{
					name: listStatus[index].activity,
					type: listStatus[index].type
				}],
				status: listStatus[index].status
			});
			
			if (++index >= listStatus.length) {
				index = 0;
			}

			await wait(waitTime, updateStatus);
		};

		await updateStatus();
	}
};

module.exports = obj;
