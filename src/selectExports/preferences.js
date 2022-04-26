const {MessageActionRow, MessageSelectMenu} = require('discord.js');

const preferences = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('selectMenu')
					.setPlaceholder('Catalogo do server')
					.setMinValues(1)
					.setMaxValues(6)
					.addOptions([
						{
							label:'Cineminha',
							description:'Venha assistir com a rapaziada',
							value: 'Cineminha'
						},
						{
							label:'Youtubezin',
							description:'Venha ver um video com a rapaziada',
							value: 'Youtubezin'
						},
						{
							label:'Jogos Online',
							description:'Venha jogar jogos online',
							value: 'Jogos Online'
						},
						{
							label:'Roleplays',
							description:'Venha jogar jogos não necessariamente digitais',
							value: 'Roleplays'
						},
						{
							label:'Conversa',
							description:'Venha proziar',
							value: 'Conversa'
						},
						{
							label:'Bailinho',
							description:'Vamo curtir um som',
							value: 'Bailinho'
						},

					])
			);
module.exports = preferences;