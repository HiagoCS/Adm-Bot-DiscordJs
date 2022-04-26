const {MessageActionRow, MessageButton} = require('discord.js');

const age = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('Criança')
			.setLabel('👶 +-10 👶')
			.setStyle('SUCCESS'),
		new MessageButton()
			.setCustomId('Adolescente')
			.setLabel('👦 +-16 👧')
			.setStyle('SUCCESS'),
		new MessageButton()
			.setCustomId('Jovem Adulto')
			.setLabel('👨 +-18 👩')
			.setStyle('SUCCESS'),
		new MessageButton()
			.setCustomId('Ancião')
			.setLabel('👴 +20 👵')
			.setStyle('SUCCESS'),
			);
module.exports = age;