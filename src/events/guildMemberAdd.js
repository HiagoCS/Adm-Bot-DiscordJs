const Discord = require('discord.js');
const YesNo = require('../btnExports/yesno.js');
const embeds = require('../JSOn/embeds.json');
module.exports = {
	name: "guildMemberAdd",
	run: (bot, member, cChannel) =>{
		member.roles.add(member.guild.roles.cache.find(r => r.name.toLowerCase() === 'humano').id);
		embeds.defaultEmbed.description = `Bem vindo ${member.user.username}#${member.user.discriminator} \nem 5s vamos começar seu config...`;
		cChannel.send({embeds:[embeds.defaultEmbed]})
			.then(msg =>{
				setTimeout(() => msg.delete(), 5000);
				setTimeout(() => setNickname(bot, member, cChannel), 5000);
			}).catch(err =>{console.log(err)});
	}
}

function setNickname(bot, member, cChannel){
	const setNickEmbed = {
		title: `MFB - Monkey's from the beach`,
		description: `Digite o apelido desejado...`
	}
	embeds.defaultEmbed.description = `Quer definir um apelido no servidor ?`;
	cChannel.send({embeds:[embeds.defaultEmbed], components:[YesNo]})
		.then(msg =>{
			const filter = b => b.user.id === member.user.id;
			cChannel.awaitMessageComponent({filter, max:1})
				.then(btn =>{
					msg.delete();
					if(btn.customId == 'yes'){
						embeds.defaultEmbed.description = `Digite o apelido desejado...`;
						cChannel.send({embeds:[embeds.defaultEmbed]})
							.then(msg =>{
								const filter = b => b.author.id === member.user.id;
								cChannel.awaitMessages({filter, max:1})
									.then(nickname =>{
										msg.delete();
										const confirmNick = {
											title: `**${nickname.first().content}**`,
											description: `Quer usar este apelido?`
										}
										cChannel.send({embeds:[confirmNick], components:[YesNo]})
											.then(msg =>{
												const filter = b => b.user.id === member.user.id;
												cChannel.awaitMessageComponent({filter, max:1})
												.then(btn =>{
													msg.delete();
													if(btn.customId == 'yes'){
														member.setNickname(nickname.first().content);
														cChannel.messages.cache.find(msg => msg.author.id === member.user.id).delete();
														//Proxima Função
													}
													else if(btn.customId == 'no'){
														setNickname(bot, member, cChannel);
													}
												}).catch(err =>{console.log(err)});
											}).catch(err =>{console.log(err)});
									}).catch(err =>{console.log(err)});
							}).catch(err =>{console.log(err)});
					}
					else if(btn.customId == 'no'){
						//Proxima Função
					}
				}).catch(err =>{console.log(err)});
		}).catch(err =>{console.log(err)});
}