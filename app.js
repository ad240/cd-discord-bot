const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '~';
var fs = require('fs');
var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

    //  CHANNEL IDS
    //  #general:   389150189719388173
    //  #general2:  389203836067119104
    //  #staff:     389639792960339979
    //  #admin:     389161550797078538

function userInfo(user, guild){
    var finalString = '';

    // Name
    finalString += '**' + user.username + '**, with the ID of **' + user.id + '**'
    // Created at Date
    var userCreated = user.createdAt.toString().split(' ');
    finalString += ', was **created on ' + userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3] + '**.'
    // Messages Sent
    finalString += ' They have sent at least **' + userData[user.id + guild.id].messagesSent + 'messages** to this server.'
    return finalString;
}

//Purge Command
bot.on('message', message => {

    // Variables - Variables make it easy to call things, since it requires less typing.
    var msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    var sender = message.author; // This variable takes the message, and finds who the author is.
    var cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    var args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.
    var sender = message.author;
    var msg = message.content.toUpperCase();
    var userlist = message.mentions.users;
    var flaggedWords = ["TRUMP","TRAP","TRAPS","TRAPPING","SISSY","KIK","FETLIFE","BANG","BANGABLE","FUCKABLE","BULGE","BULDGE","FAG","CUNT","FAGGOT","FAGGET","NIGGER","WEBCAM","CHATURBATE","RAPE","RAPING","TRANNY","TRANNIES","PORN","LADYBOY","XHAMSTER.COM","YOUPORN.COM","XTUBE.COM","CAM4.COM","DEALNEWS.COM","CROSSDRESSCLOTHING.COM","FASHION4PLAY.NET","PAULA-ANN.COMLU.COM","TRANSBETTY.COM","TRANNYLADIES.INFO","TRANNYSITES.INFO","CROSSDRESSINGCLOSET.COM","WORLDOFCROSSDRESSING.COM","SEX.COM","CROSSDRESSNOW.BLOGSPOT.COM","EMPEOPLED.COM","IMGBOX.COM","IMAGEFAP.COM","REAL-DATING.ORG","JANETSCLOSET.COM","JANETSCLOSET.TUMBLR.COM","FINIXP.COM","JYEADS.COM","PWTCITY.COM","MIAUTTY.COM","TRANSCENDMOVEMENT.COM","VAMPIREFREAKS.COM","EROSHARE.COM","FEMINIZATIONSECRETS.COM","TRANNYCAMVIDEOS.COM","POSTIMG.ORG","DRSUSANBLOCKINSTITUTE.COM","FEMININA.EU","YOUCARING.COM","CROSSDRESSERHEAVEN.COM","ETMZ.US","TVCHIX.COM","LADYBOYREVIEW.COM","IMAGEFAP.COM","EXTRALUNCHMONEY.COM"];

    // Ignore Bot Messages
    if(sender.id == '389149738219339786'){
        return;
    }

    // Message Counter
    if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {
        messagesSent: 0
    }
    // Add 1 to user's message count
    userData[sender.id + message.guild.id].messagesSent++;
   
    // Write message count file
    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        if(err) console.error(err);
    })

    // If user is not "Admin" or "Trusted," sends message to admin page when a user passes a set number of messages
    if(userData[sender.id + message.guild.id].messagesSent === 100){
        if(!message.member.roles.find("name", "Admin"||"Test")){
            bot.channels.get('389161550797078538').send(message.author + ' has sent ' + userData[sender.id + message.guild.id].messagesSent + ' recorded messages to this server .');
        }
    }

    // UserInfo Command
    if(msg.startsWith(prefix + 'USERINFO')){
        if(msg===prefix + 'USERINFO'){
            message.channel.send(userInfo(sender,message.guild));
        }
    }

    // SET USERINFO
    if (msg.startsWith(prefix + 'SETUSERINFO')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function SETUSERINFO() {

            if (!message.member.roles.find("name", "Admin")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('You need the \`Admin\` role to use this command.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }

            // We want to check if the argument is a number
            if (isNaN(args[1])) {
                // Sends a message to the channel.
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'setuserinfo <User ID> <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }
            // userlist.forEach(function(user){
                var uID = args[0];
                var newMsgSent = Number(args[1]);
                if(!userData[uID + message.guild.id]) userData[uID + message.guild.id] = {
                    messagesSent: 0
                }
                userData[uID + message.guild.id].messagesSent = newMsgSent;
                message.channel.send(uID + '\`s message count set to ' + args[1]); // Lets post into chat how many messages a user now has
            // })
        }

        // We want to make sure we call the function whenever the purge command is run.
        SETUSERINFO(); // Make sure this is inside the if(msg.startsWith)
            // Write message count file
        fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
            if(err) console.error(err);
        })
    }

    // Purge
    if (msg.startsWith(prefix + 'PURGE')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function purge() {
            message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

            if (!message.member.roles.find("name", "Admin")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('You need the \`Admin\` role to use this command.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }

            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

        }

        // We want to make sure we call the function whenever the purge command is run.
        purge(); // Make sure this is inside the if(msg.startsWith)

    }

    // Flagged Words Notification
    if(!(message.channel.id == '389639792960339979' || message.channel.id == '389161550797078538')){ //ignores messages in #Staff and #Admin channels
        for(var i=0; i<flaggedWords.length; i++){
            if(msg.includes(flaggedWords[i])){
                bot.channels.get('389639792960339979').send(message.author + ' said the flagged word ' + flaggedWords[i] + ' in ' + message.channel + '.');
            }
        }
    }
});

//Bot stuff

bot.on('ready', message => {
    //console.log('Bot started.')
    //bot.channels.get('389161550797078538').send('Beep boop, I am now online!');
});

bot.login(process.env.BOT_TOKEN);
//bot.login('Mzg5MTQ5NzM4MjE5MzM5Nzg2.DQ3tlA.uo_0M4wGCBtpbyPn_yMdaGqTeb4');
