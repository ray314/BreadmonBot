require('dotenv').config();
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Intents, Client } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const RoleSelect = require('./genshinmainselect.js');
RoleSelect.Create(client);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity(':PaimogemsRain:', { type: 'LISTENING' });
});

client.login(process.env.TOKEN);