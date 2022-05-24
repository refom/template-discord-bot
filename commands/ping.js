const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

const obj = {
	conf: {
		enable: true,
		permission: "user",
		guildOnly: true,
	},
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
		
	/** @param { CommandInteraction } interaction */
	async run(interaction) {
		await interaction.deferReply();
		const reply = await interaction.editReply("Ping?");
		await interaction.editReply(`Pong! Latency is ${reply.createdTimestamp - interaction.createdTimestamp}ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms.`);
	}
};

module.exports = obj;
