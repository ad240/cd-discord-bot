const Discord = require('discord.js');
const bot = new Discord.Client();
// const prefix = '~';
// var fs = require('fs');
// var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

//Bot stuff

bot.on('ready', message => {
	//console.log('Bot started.')
	bot.channels.get('389161550797078538').send('Beep boop, I am now online!');
});

bot.login(process.env.BOT_TOKEN);
