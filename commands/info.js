const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, CommandInteraction } = require('discord.js');

const obj = {
	conf: {
		enable: true,
		permission: "user",
		guildOnly: true,
	},
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info about user or a server!')
		.addSubcommand(subCommand =>
			subCommand
				.setName('user')
				.setDescription('Info about a user')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subCommand =>
			subCommand
				.setName('server')
				.setDescription('Info about the server'))
		.addSubcommand(subCommand =>
			subCommand
				.setName('bot')
				.setDescription('Info about the bot')),
	/** @param { CommandInteraction } interaction */
	async run(interaction) {
		const { guild, user, client } = interaction;
		const newEmbed = new MessageEmbed()
			.setTimestamp();
		await interaction.deferReply({ ephemeral: true });

		if (interaction.options.getSubcommand() === 'user') {
			const targetUser = interaction.options.getUser('target') || user;
			const member = guild.members.cache.get(targetUser.id);

			newEmbed
				.setTitle(`${member.displayName}`)
				.setAuthor({ name: targetUser.username, iconURL: targetUser.displayAvatarURL() })
				.setColor(member.displayHexColor)
				.setThumbnail(member.displayAvatarURL())
				.addFields(
					{ name: 'Roles', value: `${member.roles.cache.size - 1}` },
					{ name: 'Created Account', value: `<t:${Math.round(targetUser.createdTimestamp / 1000)}:R>` },
					{ name: 'Joined Server', value: `<t:${Math.round(member.joinedTimestamp / 1000)}:R>` },
				);

			await interaction.editReply({ embeds: [newEmbed], ephemeral: true });
		}
		else if (interaction.options.getSubcommand() === 'server') {
			const owner = await client.users.fetch(guild.ownerId);

			newEmbed
				.setTitle(guild.name)
				.setColor('#8479E1')
				.setThumbnail(guild.iconURL())
				.addFields(
					{ name: 'Owner', value: `${owner.username}` },
					{ name: 'Created at', value: `<t:${Math.round(guild.createdTimestamp / 1000)}:R>` },
					{ name: 'is Verified', value: `is **${guild.verified}**` },
					{ name: 'Members', value: `${guild.memberCount}`, inline: true },
					{ name: 'Roles', value: `${guild.roles.cache.size - 1}`, inline: true },
				)
				.setFooter({ text: user.username, iconURL: user.displayAvatarURL() });

			await interaction.editReply({ embeds: [newEmbed], ephemeral: true });
		}
		else if (interaction.options.getSubcommand() === 'bot') {
			const userBot = client.user;
			const allUsers = [];
			const allGuild = client.guilds.cache.map(guilds => {
				if (guilds.available) {
					allUsers.push(guilds.memberCount);
					guilds.name;
				}
			});
			const totalUsers = allUsers.reduce((a, b) => a + b, 0);
			
			newEmbed
				.setTitle(userBot.username)
				.setColor('AQUA')
				.setThumbnail(userBot.displayAvatarURL())
				.addFields(
					{ name: 'Total Guilds', value: `${allGuild.length}` },
					{ name: 'Total Users', value: `${totalUsers}` },
					{ name: 'Created at', value: `<t:${Math.round(userBot.createdTimestamp / 1000)}:R>` },
				);
			
			await interaction.editReply({ embeds: [newEmbed], ephemeral: true });
		}
	}
};

module.exports = obj;
