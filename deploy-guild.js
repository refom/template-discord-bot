
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');
const logger = require('./modules/logger.js');
const utils = require('./modules/utils.js');
require('dotenv').config();


/**
 * 1. in config.json, add "bot.id" and your guild-id in "guilds"
 * 2. run this file just 1x
 */
const deploy = () => {
	const commands = [];
	const path = require('path').resolve(__dirname, './commands');
	const commandFiles = utils.getAllFiles(path);
	
	for (const file of commandFiles) {
		const command = require(file);

		if (!command.conf?.enable) continue;
		if (!command.conf?.guildOnly) continue;
		commands.push(command.data.toJSON());
	}
	
	const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);
	
	// Deploy on Guild
	(async () => {
		try {
			logger.debug('Started refreshing application (/) commands.');

			await rest.put(
				Routes.applicationGuildCommands(config.bot.id, config.guilds[0]),
				{ body: commands }
			);

			logger.debug('Successfully reloaded application (/) commands.');
		} catch (error) {
			logger.error(error);
		}
	})();
};

deploy();
