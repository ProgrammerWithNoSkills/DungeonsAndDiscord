const { SlashCommandBuilder } = require('discord.js');

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rollkhl')
		.setDescription('Rolls dice in format (Input 1) D (Input 2), keep highest/lowest(Input 3)')
		.addIntegerOption(input =>
			input.setName('inputvalue')
				.setDescription('Number Of Dice')
				.setRequired(true))
		.addIntegerOption(input =>
			input.setName('dicevalue')
				.setDescription('Value Of Dice')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('keephighest')
				.setDescription('True for highest, False for lowest')
				.setRequired(true))
		.addIntegerOption(input =>
			input.setName('value')
				.setDescription('Keep how many?')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('hidden')
				.setDescription('Secret?')
				.setRequired(true)),

	async execute(interaction) {
		const diceInput = interaction.options.getInteger('inputvalue')
		const diceValue = interaction.options.getInteger('dicevalue')
		const chosen = interaction.options.getBoolean('keephighest')
		const valueKept = interaction.options.getInteger('value')
		const hiddenMessage = interaction.options.getBoolean('hidden')
		const generatedNumbers = []

		for (let i = 0; i < diceInput; i++) {
			let number = getRandomInt(1, diceValue)
			generatedNumbers.push(number)
		}

		let sorted = generatedNumbers.sort()

		if (chosen) {
			var rollsSeleted = sorted.slice(sorted.length - valueKept, sorted.length)
			for (let i = 0; i < sorted.length - valueKept; i++) {
				sorted[i] = `~~${sorted[i]}~~`
			}
		} else {
			var rollsSeleted = sorted.slice(0, valueKept)
			for (let i = valueKept; i < sorted.length; i++) {
				sorted[i] = `~~${sorted[i]}~~`
			}
		}

		const sum = rollsSeleted.reduce((partialSum, a) => partialSum + a, 0);

		await interaction.reply({ content: `Total: ${sum}, \nRolls are: ${sorted}`, ephemeral: hiddenMessage });
	},
};
