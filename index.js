'use strict';

// ===== Importing
const { Client, Intents } = require('discord.js');
const config = require('./config.json');
const CommandsHandler = require('./handler/CommandsHandler');
const EventsHandler = require('./handler/EventsHandler');
const ReactionsHandler = require('./handler/ReactionsHandler');
require('dotenv').config();


// ===== Client! Important
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		// Intents.FLAGS.GUILD_PRESENCES
	],
	partials: ['MESSAGE', 'REACTION'],
});

// Put config to client
client.container = {
	"config" : config
};

CommandsHandler(client);
EventsHandler(client);
ReactionsHandler(client);

client.login(process.env.CLIENT_TOKEN);
