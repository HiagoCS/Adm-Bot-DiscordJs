const {MessageActionRow, MessageButton} = require('discord.js');

const gender = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('Alpha Spirit')
			.setLabel('♂️ Homem ♂️')
			.setStyle('DANGER'),
		new MessageButton()
			.setCustomId('Feminazi')
			.setLabel('♀️ Mulher ♀️')
			.setStyle('DANGER'),
		new MessageButton()
			.setCustomId('Ser Supremo')
			.setLabel('🌈 Não Binario 🌈')
			.setStyle('DANGER')
			);
module.exports = gender;