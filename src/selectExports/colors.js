const {MessageActionRow, MessageSelectMenu} = require('discord.js');

const colors = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('selectMenu')
					.setPlaceholder('Cores')
					.addOptions([
						{
							label:'Vermelho',
							description:'ð¥ð¥ð¥',
							value: 'Vermelho'
						},
						{
							label:'Laranja',
							description:'ð§ð§ð§',
							value: 'Laranja'
						},
						{
							label:'Amarelo',
							description:'ð¨ð¨ð¨',
							value: 'Amarelo'
						},
						{
							label:'Verde',
							description:'ð©ð©ð©',
							value: 'Verde'
						},
						{
							label:'Azul',
							description:'ð¦ð¦ð¦',
							value: 'Azul'
						},
						{
							label:'Roxo',
							description:'ðªðªðª',
							value: 'Roxo'
						},
						{
							label:'Marrom',
							description:'ð«ð«ð«',
							value: 'Marrom'
						},
						{
							label:'Branco',
							description:'â¬â¬â¬',
							value: 'Branco'
						},
						{
							label:'PadrÃ£o',
							description:'ððð',
							value: 'PadrÃ£o'
						},

					])
			);
module.exports = colors;