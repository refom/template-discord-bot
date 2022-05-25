'use strict';

// ===== Importing
const { Client, Intents, Collection } = require('discord.js');
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

// Put config to client container
client.container = {
	"config" : config,
	"commands": new Collection(),
	"reactions": new Collection(),
};

CommandsHandler(client);
EventsHandler(client);
ReactionsHandler(client);

client.login(process.env.CLIENT_TOKEN);
