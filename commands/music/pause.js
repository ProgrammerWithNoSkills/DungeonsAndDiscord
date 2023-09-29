"use strict";

const { SlashCommandBuilder, Client } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause music'),

	async execute(interaction) {
		const connection = getVoiceConnection(interaction.member.guild.id)

		connection.state.subscription.player.pause();

		await interaction.reply({ content: 'Paused! ', ephemeral: true });
	},
};
