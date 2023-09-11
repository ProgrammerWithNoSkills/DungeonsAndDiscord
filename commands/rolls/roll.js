const { SlashCommandBuilder } = require('discord.js');

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls dice in format (Input 1) D (Input 2)')
		.addIntegerOption(input =>
			input.setName('inputvalue')
				.setDescription('Number Of Dice')
				.setRequired(true))
		.addIntegerOption(input =>
			input.setName('dicevalue')
				.setDescription('Value Of Dice')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('hidden')
				.setDescription('Secret?')
				.setRequired(true)),

	async execute(interaction) {
		const diceInput = interaction.options.getInteger('inputvalue')
		const diceValue = interaction.options.getInteger('dicevalue')
		const hiddenMessage = interaction.options.getBoolean('hidden')
		const generatedNumbers = []

		for (let i = 0; i < diceInput; i++) {
			let number = getRandomInt(1, diceValue)
			generatedNumbers.push(number)
		}

		const sum = generatedNumbers.reduce((partialSum, a) => partialSum + a, 0);

		await interaction.reply({ content: `Total: ${sum}, \nRolls are: ${generatedNumbers}`, ephemeral: hiddenMessage });
	},
};
