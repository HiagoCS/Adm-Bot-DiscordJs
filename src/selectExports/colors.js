const {MessageActionRow, MessageSelectMenu} = require('discord.js');

const colors = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('selectMenu')
					.setPlaceholder('Cores')
					.addOptions([
						{
							label:'Vermelho',
							description:'🟥🟥🟥',
							value: 'Vermelho'
						},
						{
							label:'Laranja',
							description:'🟧🟧🟧',
							value: 'Laranja'
						},
						{
							label:'Amarelo',
							description:'🟨🟨🟨',
							value: 'Amarelo'
						},
						{
							label:'Verde',
							description:'🟩🟩🟩',
							value: 'Verde'
						},
						{
							label:'Azul',
							description:'🟦🟦🟦',
							value: 'Azul'
						},
						{
							label:'Roxo',
							description:'🟪🟪🟪',
							value: 'Roxo'
						},
						{
							label:'Marrom',
							description:'🟫🟫🟫',
							value: 'Marrom'
						},
						{
							label:'Branco',
							description:'⬜⬜⬜',
							value: 'Branco'
						},
						{
							label:'Padrão',
							description:'🔘🔘🔘',
							value: 'Padrão'
						},

					])
			);
module.exports = colors;