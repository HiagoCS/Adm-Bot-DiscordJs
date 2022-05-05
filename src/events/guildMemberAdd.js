const Discord = require('discord.js');
const YesNo = require('../btnExports/yesno.js');
const embeds = require('../JSON/embeds.json');
const botConfig = require('../JSON/config.json');
const Canvas = require('canvas');
const fs  = require('fs');
const path = require('path');
module.exports = {
	name: "guildMemberAdd",
	run: (bot, member, cChannel) =>{
		member.roles.add(member.guild.roles.cache.find(r => r.name.toLowerCase() === 'humano').id);
		embeds.defaultEmbed.description = `Bem vindo **${member.user.username}#${member.user.discriminator}**\nem 5s vamos começar seu config...`;
		embeds.defaultEmbed.author.icon_url = member.guild.iconURL();
		cChannel.send({embeds:[embeds.defaultEmbed]})
			.then(msg =>{
				setTimeout(() => msg.delete(), 5000);
				setTimeout(() => setNickname(bot, member, cChannel), 5000);
			}).catch(err =>{console.log(err)});
	}
}
function setNickname(bot, member, cChannel){
	embeds.defaultEmbed.title = `Quer definir um apelido no servidor ?`;
	embeds.defaultEmbed.description = `Selecione se você quer adicionar um apelido no servidor`;
	cChannel.send({embeds:[embeds.defaultEmbed], components:[YesNo]})
		.then(msg =>{
			const filter = b => b.user.id === member.user.id;
			cChannel.awaitMessageComponent({filter, max:1})
				.then(btn =>{
					msg.delete();
					if(btn.customId == 'yes'){
						cChannel.permissionOverwrites.create(
							member.guild.roles.cache.find(r => r.name.toLowerCase() === 'humano'),
							{SEND_MESSAGES:true}
						).catch(e => console.log(e));
						embeds.defaultEmbed.title = `Digite o apelido desejado...`;
						cChannel.send({embeds:[embeds.defaultEmbed]})
							.then(msg =>{
								const filter = b => b.author.id === member.user.id;
								cChannel.awaitMessages({filter, max:1})
									.then(nickname =>{
										cChannel.permissionOverwrites.create(
											member.guild.roles.cache.find(r => r.name.toLowerCase() === 'humano'),
											{SEND_MESSAGES:false}
										).catch(e => console.log(e));
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
														setAge(bot, member, cChannel)
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
						setAge(bot, member, cChannel)
					}
				}).catch(err =>{console.log(err)});
		}).catch(err =>{console.log(err)});
}

function setAge(bot, member, cChannel){
	const age = require('../btnExports/age.js');
	embeds.defaultEmbed.title = `Quantos anos você tem ?`;
	embeds.defaultEmbed.description = `Selecione mais ou menos sua idade`;
	cChannel.send({embeds:[embeds.defaultEmbed], components:[age]})
		.then(msg =>{
			const filter = b => b.user.id === member.user.id;
			cChannel.awaitMessageComponent({filter, max:1})
				.then(btn =>{
					msg.delete();
					member.roles.add(member.guild.roles.cache.find(r => r.name === btn.customId).id);
					setRegion(bot, member, cChannel);
				}).catch(err =>{console.log(err)});
		}).catch(err =>{console.log(err)});
}

function setRegion(bot, member, cChannel){
	const region = require('../btnExports/region.js');
	embeds.defaultEmbed.title = `Em qual região você mora ?`;
	embeds.defaultEmbed.description = `Selecione mais ou menos sua região`;
	cChannel.send({embeds:[embeds.defaultEmbed], components:[region]})
		.then(msg =>{
			const filter = b => b.user.id === member.user.id;
			cChannel.awaitMessageComponent({filter, max:1})
				.then(btn =>{
					msg.delete();
					member.roles.add(member.guild.roles.cache.find(r => r.name === btn.customId).id);
					setGender(bot, member, cChannel)
				}).catch(err =>{console.log(err)});
		}).catch(err =>{console.log(err)});
}
function setGender(bot, member, cChannel){
	const gender = require('../btnExports/gender.js');
	embeds.defaultEmbed.title = `Qual é seu/sua genêro ?`;
	embeds.defaultEmbed.description = `Selecione seu genêro`;
	cChannel.send({embeds:[embeds.defaultEmbed], components:[gender]})
		.then(msg =>{
			const filter = b => b.user.id === member.user.id;
			cChannel.awaitMessageComponent({filter, max:1})
				.then(btn =>{
					msg.delete();
					member.roles.add(member.guild.roles.cache.find(r => r.name === btn.customId).id);
					setPreferences(bot, member, cChannel);
				}).catch(err =>{console.log(err)});
		}).catch(err =>{console.log(err)});
}

function setPreferences(bot, member, cChannel){
	const preferences = require('../selectExports/preferences.js');
	embeds.defaultEmbed.title = `Selecione suas preferencias dentro do servidor...`;
	embeds.defaultEmbed.description = ``;
	cChannel.send({embeds:[embeds.defaultEmbed], components:[preferences]})
		.then(msg =>{
			const filter = b => b.user.id === member.user.id;
			cChannel.awaitMessageComponent({filter, max:1})
				.then(opts =>{
					msg.delete();
					for(let i in opts.values){
						member.roles.add(member.guild.roles.cache.find(r => r.name === opts.values[i]).id);
					}
					setColors(bot, member, cChannel);
				}).catch(err =>{console.log(err)});
		}).catch(err =>{console.log(err)});
}

function setColors(bot, member, cChannel){
	const colors = require('../selectExports/colors.js');
	embeds.defaultEmbed.title = `Selecione uma cor para seu nome...`;
	cChannel.send({embeds:[embeds.defaultEmbed], components:[colors]})
		.then(msg =>{
			const filter = b => b.user.id === member.user.id;
			cChannel.awaitMessageComponent({filter, max:1})
				.then(opts =>{
					msg.delete();
					member.roles.add(member.guild.roles.cache.find(r => r.name === opts.values[0]).id);
					finalConfig(bot, member, cChannel)
				}).catch(err =>{console.log(err)});
		}).catch(err =>{console.log(err)});
}
function finalConfig(bot, member, cChannel){
	embeds.defaultEmbed.title = `Aproveite o server`;
	embeds.defaultEmbed.description = `Perfil configurado, vc desevoluiu para Miquinho`;
	cChannel.send({embeds:[embeds.defaultEmbed]});
	member.roles.remove(member.guild.roles.cache.find(r => r.name.toLowerCase() === 'humano').id);
	member.roles.add(member.guild.roles.cache.find(r => r.name.toLowerCase() === 'miquinho').id);

	welcomeImage(bot, member, member.guild.channels.cache.find(c => c.id === botConfig.channels_id.wChannel));
}
function welcomeImage(bot, member, wChannel){
	const readImg = fs.readFileSync(path.join(__dirname, 'bckimg.jpg'));
	let key = {};
	key.create = Canvas.createCanvas(1024, 500);
	key.context = key.create.getContext('2d');
	key.context.font = '72px sans-serif';
	key.context.fillStyle = '#ffffff';

	Canvas.loadImage(readImg).then(img =>{
		key.context.drawImage(img, 0, 0, 1024, 500);
		key.context.beginPath();
		key.context.stroke();
		key.context.fill();

		key.context.font = '900 60px Arial';
		key.context.textAlign = 'center';
		key.context.strokeStyle = 'black';
		key.context.lineWidth = 8;
		key.context.strokeText(`${member.user.username}#${member.user.discriminator}`, 512, 100);
		key.context.fillStyle = 'white';
		key.context.fillText(`${member.user.username}#${member.user.discriminator}`, 512, 100);	
		key.context.beginPath();
		key.context.arc(521, 240, 119, 0, Math.PI * 2, true);
		key.context.stroke();
		key.context.closePath();
		key.context.clip();

		Canvas.loadImage(member.user.displayAvatarURL({format: 'png', size: 1024})).then(uImg =>{
			key.context.drawImage(uImg, 400, 120, 240, 240);
			let msg = new Discord.MessageAttachment(key.create.toBuffer(), `${member.user.username}.png`);

			wChannel.send({files:[msg]}).catch(e =>{
				console.log(e);
			});
		}).catch(err =>{console.log(err)});
	}).catch(err =>{console.log(err)});
}