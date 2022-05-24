const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

const obj = {
	conf: {
		enable: false,
		permission: "user",
		guildOnly: true,
	},
	data: new SlashCommandBuilder()
		.setName('template')
		.setDescription('Template'),

	/** @param { CommandInteraction } interaction */
	async run(interaction) {
		await interaction.deferReply();
		const reply = await interaction.editReply("Ping?");
	}
};

module.exports = obj;
