require('dotenv').config();
const express = require('express');
const app = express();
const { ActivityType } = require('discord.js');
const { GatewayIntentBits, Client } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] })
const port = process.env.PORT || 4000;
const RoleSelect = require('./genshinmainselect.js');
RoleSelect.Create(client);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setPresence({
    activities: [{ name: ':PaimogemsRain:', type: ActivityType.Listening}],
    status: 'online'
  })
});

client.on('error', error => {
	console.log("Discord Error:\n"+error);
});

client.login(process.env.TOKEN);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})