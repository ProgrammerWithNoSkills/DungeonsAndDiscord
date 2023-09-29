"use strict";

const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Disconnects bot'),

	async execute(interaction) {
		const connection = getVoiceConnection(interaction.member.guild.id)

		connection.destroy();

		await interaction.reply({ content: 'Disconnected! ', ephemeral: true });
	},
};
