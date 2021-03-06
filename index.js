require('dotenv').config();
const express = require('express');
const app = express();
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Intents, Client } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const port = process.env.PORT || 3000;
const RoleSelect = require('./genshinmainselect.js');
RoleSelect.Create(client);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity(':PaimogemsRain:', { type: 'LISTENING' });
});

client.on('error', error => {
	console.log("Discord Error:\n"+error);
});

client.login(process.env.TOKEN);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})