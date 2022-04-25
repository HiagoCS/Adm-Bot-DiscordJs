require('dotenv').config();
const fs = require('fs');

const Discord = require('discord.js');
const bot = new Discord.Client({
	intents:[
		'GUILDS',
		'GUILD_MESSAGE_REACTIONS',
		'GUILD_MESSAGES',
		'GUILD_INVITES',
		'GUILD_VOICE_STATES',
		'GUILD_MEMBERS',
		'GUILD_PRESENCES'
	]
});
fs.readdir("./src/commands/", (err, file) =>{
	if(err) console.log(err);
	let jsFile = file.filter(f => f.split(".").pop() === "js");
	if(jsFile.length <= 0){
		console.log("Não achei comando porra!!");
		return;
	}
	jsFile.forEach((f, i) =>{
		let props = require(`./src/commands/${f}`);
		console.log(`${f} loaded`);
		bot.commands.set(props.name, props);
	});
});
bot.commands = new Discord.Collection();
bot.on("ready", () =>{
	console.log("Moderator ON");
});

bot.login(process.env.BOT_TOKEN);
bot.on('messageCreate', (msg) =>{
	let messageArray = msg.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	if (msg.author.bot)
		return;
	let commandFile = bot.commands.get(cmd.slice(process.env.PREFIX.length));
	if (commandFile){
		if(args.length > 1)
			commandFile.run(bot, msg, args.toString().replace(",", " "));
		else
			commandFile.run(bot, msg, args.toString());
	}
});