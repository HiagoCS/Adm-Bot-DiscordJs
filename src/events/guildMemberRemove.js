const Discord = require('discord.js');
const botConfig = require('../JSON/config.json');
const Canvas = require('canvas');
const fs  = require('fs');
const path = require('path');

module.exports = {
	name: "guildMemberRemove",
	run: (bot, member, eChannel) =>{
        exitImage(bot, member, eChannel);
	}
}
function exitImage(bot, member, eChannel){
    const readImg = fs.readFileSync(path.join(__dirname, 'exitimg.png'));
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

        key.context.font = '900 40px Arial';
		key.context.textAlign = 'center';
		key.context.strokeStyle = 'black';
		key.context.lineWidth = 8;
		key.context.strokeText(`${member.user.username}#${member.user.discriminator}`, 256, 45);
		key.context.fillStyle = 'white';
		key.context.fillText(`${member.user.username}#${member.user.discriminator}`, 256, 45);

        key.context.font = '900 35px Arial';
		key.context.textAlign = 'center';
		key.context.strokeStyle = 'black';
		key.context.lineWidth = 8;
		key.context.strokeText(`Evoluiu e saiu da tribo`, 226, 100);
		key.context.fillStyle = 'white';
		key.context.fillText(`Evoluiu e saiu da tribo`, 226, 100);

        key.context.beginPath();
		key.context.arc(445, 90, 25, 0, Math.PI * 2, true);
		key.context.closePath();
		key.context.clip();

        const readImg = fs.readFileSync(path.join(__dirname, 'macaco triste.png'));
        Canvas.loadImage(readImg).then(img =>{
            key.context.drawImage(img, 400, 40, 90, 90);
            let msg = new Discord.MessageAttachment(key.create.toBuffer(), `${member.user.username}.png`);
		    eChannel.send({files:[msg]}).catch(e =>{
			    console.log(e);
		    });
        }).catch(e =>{console.log(e)});
    }).catch(e =>{console.log(e)});
}