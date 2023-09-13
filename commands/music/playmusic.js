"use strict";

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('node:fs');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('playlist')
		.setDescription('Plays music from music in local files')
		.addStringOption(option =>
			option.setName('listname')
				.setDescription('Insert list name')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('songname')
				.setDescription('Insert song name')
				.setRequired(true)), 

	async execute(interaction) {

		await interaction.reply('test');
	},
};
