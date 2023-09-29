"use strict";

const { SlashCommandBuilder} = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unpause')
		.setDescription('Unpause music'),

	async execute(interaction) {
		const connection = getVoiceConnection(interaction.member.guild.id)

		connection.state.subscription.player.unpause();

		await interaction.reply({ content: 'Unpaused! ', ephemeral: true });
	},
};
