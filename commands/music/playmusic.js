"use strict";

const { SlashCommandBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs');
const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require('@discordjs/voice');
const { channel } = require('node:diagnostics_channel');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playmusic')
		.setDescription('Plays music from music in local files')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel to join')
				.addChannelTypes(ChannelType.GuildVoice)
				.setRequired(true))
		.addStringOption(option =>
			option.setName('listname')
				.setDescription('Insert list name')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('songname')
				.setDescription('Insert song name without .mp3')
				.setRequired(true)),


	async execute(interaction) {
		const channelToJoin = interaction.options.getChannel('channel')
		const channelId = channelToJoin.id
		const folderName = interaction.options.getString('listname')
		const songName = interaction.options.getString('songname')
		const songLocation = createAudioResource(`music/${folderName}/${songName}.mp3`)

		if (fs.existsSync(`music/${folderName}/${songName}.mp3`)) {

			await interaction.reply({ content: 'Connected to voice channel! ', ephemeral: true })

			// Set parameters of joining voice Channel
			const connection = joinVoiceChannel({
				channelId: channelId,
				guildId: interaction.channel.guild.id,
				adapterCreator: interaction.channel.guild.voiceAdapterCreator,
			});

			// Create audio player instance
			const player = createAudioPlayer();

			// Play music
			player.play(songLocation);

			// Stream music
			connection.subscribe(player);

		} else {
			await interaction.reply({ content: 'Song does not exist!', ephemeral: true })
		}
			
	},
};

