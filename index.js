//Ce dont le bot a besoins.
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client ();
const moment = require("moment");

//JSON Files
let points = JSON.parse(fs.readFileSync('JSON/points.json', 'utf8'));
let userData = JSON.parse(fs.readFileSync('JSON/userData.json', 'utf8'));

bot.on('ready', () => {
    bot.user.setActivity('vous aider');
    console.log('Je suis bien connecté')
});

bot.on('message', msg => {
    const guildMember = msg.member;
    
    if (!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {}
    if (!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 150.
    if (!userData[sender.id + message.guild.id].lastDaily) userData[sender.id + message.guild.id].lastDaily = "Not Collected";

    //Créer les points de Serpentards.
    if (!points['Serpentard']) points['Serpentard'] = {}
    if (!points['Serpentard'].points) points['Serpentard'].points = 0.

    //Créer les points de Gryffondor.
    if (!points['Gryffondor']) points['Gryffondor'] = {}
    if (!points['Gryffondor'].points) points['Gryffondor'].points = 0.

    //Créer les points de Poufsouffle.
    if (!points['Poufsouffle']) points['Poufsouffle'] = {}
    if (!points['Poufsouffle'].points) points['Poufsouffle'].points = 0.

    //Créer les points de Serdaigle.
    if (!points['Serdaigle']) points['Serdaigle'] = {}
    if (!points['Serdaigle'].points) points['Serdaigle'].points = 0.

    //Attribue un PREFIX à notre bot.
    let prefix = "*"
    
    fs.writeFile('JSON/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error (err);
    })
    fs.writeFile('JSON/points.json', JSON.stringify(points), (err) => {
        if (err) console.error (err);
    })

    if (msg.content === "Ping") {
        msg.channel.send('Pong');
        console.log('Initialization du BOT.')
    }

    if (msg.content === prefix + "aide") {
        msg.channel.send({embed: {
            title: "Aide Philosophale",
            color: 0x00A1D7,
            fields: [{
                name: "Général",
                value: `!balance | Permet de voir son compte bancaire.
!paye | Permet de reçevoir sa paye (Tout les 24h)
!points | Permet de voir le nombre de points de chaques maisons.`,
                inline: false
            },
            {
                name: "Professeur",
                value: `!agryffondor | Ajoute 10 points à Gryffondor.
!rgryffondor | Retire 10 points à Gryffondor.
!apoufsouffle | Ajoute 10 points à Poufsouffle.
!rpousouffle | Retire 10 points à Poufsouffle.
!aserdaigle | Ajoute 10 points à Serdaigle.
!rserdaigle | Retire 10 points à Serdaigle.
!aserpentard | Ajoute 10 points à Serpentard.
!rserpentard | Retire 10 points à Serpentard.`,
                inline: false
            }]
        }})
    }
    if (msg.content === prefix + "rserdaigle") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Retrait de 10 points pour Serdaigle !')
            points['Serdaigle'].points -= 10;
        }
    }
    
    if (msg.content === prefix + "aserdaigle") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Ajout de 10 points pour Serdaigle !')
            points['Serdaigle'].points += 10;
        }
    }

    if (msg.content === prefix + "rpoufsouffle") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Retrait de 10 points pour Poufsouffle !')
            points['Poufsouffle'].points -= 10;
        }
    }
    
    if (msg.content === prefix + "apoufsouffle") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Ajout de 10 points pour Poufsouffle !')
            points['Poufsouffle'].points += 10;
        }
    }
    
    if (msg.content === prefix + "rserpentard") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Retrait de 10 points pour Serpentard !')
            points['Serpentard'].points -= 10;
        }
    }

    if (msg.content === prefix + "aserpentard") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Ajout de 10 points pour Serpentard !')
            points['Serpentard'].points += 10;
        }
    }

    if (msg.content === prefix + "rgryffondor") {
        if (msg.member.roles.get(process.env.PROFESSEUR)) {
            msg.reply('Retrait de 10 points pour Gryffondor !')
            points['Gryffondor'].points -= 10;
        }
    }
    
    
    if (msg.content === prefix + "agryffondor") {
        if (msg.member.roles.get(process.ENV.PROFESSEUR)) {
            msg.reply('Ajout de 10 points pour Gryffondor !')
            points['Gryffondor'].points += 10;
        }
    }

    if (msg.content === prefix + "points") {
        msg.channel.send({embed: {
            title: "Points",
            color: 0x00A1D7,
            fields: [{
                name: "Serpentard",
                value: points['Serpentard'].points,
                inline: true
            },
            {
                name: "Gryffondor",
                value: points['Gryffondor'].points,
                inline: true
            },
            {
                name: "Poufsouffle",
                value: points['Poufsouffle'].points,
                inline: true
            },
            {
                name: "Serdaigle",
                value: points['Serdaigle'].points,
                inline: true
            }]
        }})
    }
    if (message.content === prefix + "gringotts" || message.content === prefix + "balance") {
        message.channel.send({embed:{
            title: "Gringotts",
            color: 0x0079FF,
            fields: [{
                name: "Propriétaire du Compte",
                value: message.author.username,
                inline: true
            },
            {
                name: "Balance du Compte",
                value:userData[sender.id + message.guild.id].money,
                inline: true
            }]
        }})
    }

    if (message.content === prefix + "paye" || message.content === prefix + "daily") {
        if (userData[sender.id + message.guild.id].lastDaily != moment().format('L')) {
            userData[sender.id + message.guild.id].lastDaily = moment().format('L')
            userData[sender.id + message.guild.id].money += 500;
            message.channel.send({embed: {
                title:'Jour de Paye',
                color: 0x0079FF,
                description:'Vous récoltez 50 Gallions, ajouté à votre account!'
                
            }})
        } else {
            message.channel.send({embed: {
                title:'Jour de Paye',
                color: 0x0079FF,
                description:'Vous avez déjà récolté votre paye. Vous pouvez récolter votre prochaine paye dans' + moment().endOf('jour').fromNow() + '.'
        }})
    }

    fs.writeFile('JSON
                 /userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
    })
}});
bot.login(process.env.TOKEN);
