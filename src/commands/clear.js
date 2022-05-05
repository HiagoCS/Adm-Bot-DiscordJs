const Discord = require('discord.js');
module.exports = {
    name: "clear",
    run: (bot, msg, args) =>{
        // ID DO CANAL = msg.channelId
        if(args){
            msg.channel.bulkDelete(args, true)
            .then(e =>{
                console.log(e);
            }).catch(e =>{
                console.log(e);
            });
        }
    }
}