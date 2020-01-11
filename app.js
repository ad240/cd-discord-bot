const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '~!';
var fs = require('fs');
var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
var flaggedWordsRegEx = [/\btrump\b/i,/\btrap\b/i,/\btraps\b/i,/\btrapping\b/i,/\bsiss/i,/\bkik\b/i,/\bfetlife\b/i,/\bbang\b/i,/\bbangable\b/i,/\bfuckable\b/i,/\bbulge\b/i,/\bbuldge\b/i,/\bfag\b/i,/\bfags\b/i,/\bcunt\b/i,/\bfaggot\b/i,/\bfagget\b/i,/\bnigger\b/i,/\bwebcam\b/i,/\bchaturbate\b/i,/\brape\b/i,/\braping\b/i,/\btranny\b/i,/\btrannies\b/i,/porn/i,/\bladyboy\b/i,/xhamster/i,/xtube/i,/\bcam4.com\b/i,/\bdealnews.com\b/i,/\bcrossdressclothing.com\b/i,/\bfashion4play.net\b/i,/\bpaula-ann.comlu.com\b/i,/\btransbetty.com\b/i,/\btrannyladies.info\b/i,/\btrannysites.info\b/i,/\bcrossdressingcloset.com\b/i,/\bworldofcrossdressing.com\b/i,/\bsex.com\b/i,/\bcrossdressnow.blogspot.com\b/i,/\bempeopled.com\b/i,/\bimgbox.com\b/i,/\bimagefap.com\b/i,/\breal-dating.org\b/i,/janetscloset/i,/\bfinixp.com\b/i,/\bjyeads.com\b/i,/\bpwtcity.com\b/i,/\bmiautty.com\b/i,/\btranscendmovement.com\b/i,/\bvampirefreaks.com\b/i,/\beroshare\b/i,/\bfeminizationsecrets.com\b/i,/\btrannycamvideos.com\b/i,/\bpostimg.org\b/i,/\bdrsusanblockinstitute.com\b/i,/\bfeminina.eu\b/i,/\byoucaring.com\b/i,/\bcrossdresserheaven.com\b/i,/\betmz.us\b/i,/\btvchix\b/i,/\bladyboyreview.com\b/i,/\bimagefap.com\b/i,/\bextralunchmoney.com\b/i,/\bcuck\b/i,/\bboner\b/i,/\bhookup\b/i,/\blingerie\b/i,/\bbrexit\b/i,/\bfetish\b/i,/\bcock\b/i,/\bhypno\b/i,/\bcamming\b/i,/\bcamgirl\b/i,/\bcamwhore\b/i,/\bcam\b/i,/\bkinky\b/i,/\bstrapon\b/i,/\bstrap-on\b/i,/\berotic/i,/\bshemale\b/i,/\bsjw\b/i,/\bsocial justice warrior\b/i,/\bhorny\b/i,/\bcum\b/i,/\bcummin|\bcumin/i,/politic/i,/\bpeg\b|\bpegging|\bpegged|\bpeged|\bpeging/i,/\bfeminization|\bfemenization/i,/\bdom\b/i,/\bsub\b/i,/\bhumiliate\b/i,/\bfet\b/i,/\bincel\b/i];
var flaggedWords = ["TRUMP","TRAP","TRAPS","TRAPPING","SISSY","KIK","FETLIFE","BANG","BANGABLE","FUCKABLE","BULGE","BULDGE","FAG","FAGS","CUNT","FAGGOT","FAGGET","NIGGER","WEBCAM","CHATURBATE","RAPE","RAPING","TRANNY","TRANNIES","PORN","LADYBOY","XHAMSTER.COM","XTUBE.COM","CAM4.COM","DEALNEWS.COM","CROSSDRESSCLOTHING.COM","FASHION4PLAY.NET","PAULA-ANN.COMLU.COM","TRANSBETTY.COM","TRANNYLADIES.INFO","TRANNYSITES.INFO","CROSSDRESSINGCLOSET.COM","WORLDOFCROSSDRESSING.COM","SEX.COM","CROSSDRESSNOW.BLOGSPOT.COM","EMPEOPLED.COM","IMGBOX.COM","IMAGEFAP.COM","REAL-DATING.ORG","JANETSCLOSET.COM","FINIXP.COM","JYEADS.COM","PWTCITY.COM","MIAUTTY.COM","TRANSCENDMOVEMENT.COM","VAMPIREFREAKS.COM","EROSHARE.COM","FEMINIZATIONSECRETS.COM","TRANNYCAMVIDEOS.COM","POSTIMG.ORG","DRSUSANBLOCKINSTITUTE.COM","FEMININA.EU","YOUCARING.COM","CROSSDRESSERHEAVEN.COM","ETMZ.US","TVCHIX","LADYBOYREVIEW.COM","IMAGEFAP.COM","EXTRALUNCHMONEY.COM","CUCK","BONER","HOOKUP","LINGERIE","BREXIT","FETISH","COCK","HYPNO","CAMMING","CAMGIRL","CAMWHORE","CAM","KINKY","STRAPON","STRAP-ON","EROTIC","SHEMALE","SJW","SOCIAL JUSTICE WARRIOR","HORNY","CUM","CUMMING","POLITICS","PEG","FEMINIZATION","DOM","SUB","HUMILIATE","FET","INCEL"];

bot.on('message', message => {

    // Variables - Variables make it easy to call things, since it requires less typing.
    var msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    var sender = message.author; // This variable takes the message, and finds who the author is.
    var cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    var args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.
    var sender = message.author;
    var msg = message.content.toUpperCase();
    var userlist = message.mentions.users;

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

    // Sends message to admin channel when a non admin or test user passes a set number of messages
    if(userData[sender.id + message.guild.id].messagesSent === 100){
        if(!message.member.roles.find("name", "Admin")&&!message.member.roles.find("name","Trusted")&&!message.member.roles.find("name","Moderator")){
            bot.channels.get('297364833756643329').send(message.author + ' has ' + userData[sender.id + message.guild.id].messagesSent + ' recorded messages to this server .');
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
                message.channel.send(uID + '\'s message count set to ' + args[1] + '.'); // Lets post into chat how many messages a user now has
            // })
        }

        // We want to make sure we call the function whenever the purge command is run.
        SETUSERINFO(); // Make sure this is inside the if(msg.startsWith)
            // Write message count file
        fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
            if(err) console.error(err);
        })
    }

    // Flagged Words Notification
    if(!(message.channel.id == '337587604859912193' || message.channel.id == '297364833756643329' || message.channel.id == '390688064130777088')){ //ignores messages in #Staff and #Admin channels
        for(var i=0; i<flaggedWords.length; i++){
            var testWord = eval(flaggedWordsRegEx[i]);
            if(message.content.match(testWord)){
                    bot.channels.get('337587604859912193').send(message.author + ' said the flagged word ' + flaggedWords[i] + ' in ' + message.channel + '. \nMessage: "' + message.content + '"');
            }
        }
    }
    

    // Add Filter Word
    if (msg.startsWith(prefix + 'ADDWORD')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function addWord() {
            if (!message.member.roles.find("name", "Admin")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('You need the \`Admin\` role to use this command.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }
            var newWord = args[0];
            flaggedWords.push(newWord);
            message.channel.send('"' + newWord + '" added to filter!'); // Lets post into chat how many messages a user now has
        }
        // We want to make sure we call the function whenever the purge command is run.
        addWord(); // Make sure this is inside the if(msg.startsWith)
        
    }
    
    //Botspeak
    if((message.channel.id == '390688064130777088')){
        if(msg.startsWith('BOTSPEAK|')){
            if (!message.member.roles.find("name", "Admin")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                    message.channel.send('You cannot use this command.'); // This tells the user in chat that they need the role.
                    return; // this returns the code, so the rest doesn't run.
            }
            var speakMsg = message.content.slice(8).split("|"); // This variable slices off the prefix, then puts the rest in an array based off the spaces
            var speakCh = speakMsg[1];
            if(!(speakCh == 'general_chat' || speakCh == 'crossdressing' || speakCh == 'admin' )){
                message.channel.send('Channel Name Invalid.'); // This tells the user in chat that they need the role.
                return;
            }
            if(speakCh == 'general_chat'){
                channelID = '293801174178594816'
            }
            if(speakCh == 'crossdressing'){
                channelID = '293792079702917125'
            }
            if(speakCh == 'admin'){
                channelID = '297364833756643329'
            }
            bot.channels.get(channelID).send(speakMsg[2]);
         }
    }
    
    // Help
    if (msg.startsWith(prefix + 'HELP')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
       message.channel.send('**CD SERVER BOT COMMANDS** \n **~!setuserinfo <userID> <number>**: sets a specific user\'s message count to the number entered. \n **~!addword <WORD>**: Adds word to list of flagged words. Must be entered in all CAPS.')
    }
});

//Bot stuff

bot.on('ready', message => {
    //console.log('Bot started.')
    bot.channels.get('390688064130777088').send('Beep boop, bot online!');
});

bot.login(process.env.BOT_TOKEN);
