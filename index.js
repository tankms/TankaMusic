const {Client, Attachment} = require('discord.js');
const Discord = require('discord.js');
const bot = new Client();

const ytdl = require("ytdl-core");


 const PREFIX = '$';



var servers = {};


bot.on('ready', () =>{
console.log('Bot Is Online Dumbass')
bot.user.setActivity('No.6 Collaborations Project', {type: 'LISTENING'});
})
 
bot.on('message', message=>{
   let args = message.content.substring(PREFIX.length).split(" ");
   var mention = message.mentions.users.first();
   switch(args[0]){

      
case 'play':

function play(connection, message){
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift();
    
    server.dispatcher.on("end", function(){
        if(server.queue[0]){
            play(connection, message);
        }else {
            connection.disconnect();
        }
    });
}


if(!args[1]){
    message.channel.sendMessage("Pls Put A Link");
    return;
}
if(!message.member.voiceChannel){
    message.channel.sendMessage("Join A Channel To Play The Bot");
    return;
}
if(!servers[message.guild.id]) servers[message.guild.id] = {
    queue : []
}
    var server = servers[message.guild.id];

server.queue.push(args[1]);

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){

    play(connection, message);
    message.channel.sendMessage(message + "Now Playing!")
    })
    
    
break;

case 'skip':

var server = servers[message.guild.id];

if(server.dispatcher) server.dispatcher.end();
message.channel.sendMessage('Skipping')
break;

case 'stop':
var server = servers[message.guild.id];
if(message.guild.voiceConnection){
    for(var i = server.queue.length -1; i >=0; i--){
server.queue.splice(i, 1);
    }
    server.dispatcher.end();
    message.channel.sendMessage('Leaving Voice Channel')
    console.log('Stopped The Queue Leaving Voice Channel')
}
if(!message.guild.connection) message.guild.voiceConnection.disconnect();

break;

       case 'leave':
        var server = servers[message.guild.id];
        if(message.guild.voiceConnection){
            for(var i = server.queue.length -1; i >=0; i--){
        server.queue.splice(i, 1);
            }
            server.dispatcher.end();
            message.channel.sendMessage('Leaving Voice Channel')
            console.log('Stopped The Queue Leaving Voice Channel')
        }
        if(!message.guild.connection) message.guild.voiceConnection.disconnect();
        break;
}});  


bot.login(process.env.BOT_TOKEN); 
