const {MessageActionRow, MessageButton} = require('discord.js');

const region = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('Mandrake')
			.setLabel('☂️ Grande São Paulo ☂️')
			.setStyle('PRIMARY'),
		new MessageButton()
			.setCustomId('Chico Bento')
			.setLabel('🌾 Interior 🌾')
			.setStyle('PRIMARY'),
		new MessageButton()
			.setCustomId('Caiçara')
			.setLabel('🦀 Baixada 🦀')
			.setStyle('PRIMARY'),
		new MessageButton()
			.setCustomId('Baiano')
			.setLabel('🌎 Fora de SP 🌎')
			.setStyle('PRIMARY'),
			);
module.exports = region;