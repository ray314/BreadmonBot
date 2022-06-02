const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const CHANNEL_ID = '981900802144747520';
const ROLES = require('./roles.json').CHARACTER_ROLES;
const EMBED_TITLE = "(Optional) Character roles.";

// Embed for Character roles
const EMBED = new MessageEmbed()
.setColor('#eb7b36')
.setTitle(EMBED_TITLE)
.setDescription('Choose a Genshin character to display next to your name.')
.setThumbnail('https://cdn.discordapp.com/attachments/925162470107123752/981845568567513099/Icon_Emoji_054_Ganyu_No_touching21.png');

// Action row for Character roles select menus (teyvat - snezhnaya)
const ACTIONROW_1 = [
new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Teyvat').setPlaceholder('Teyvat').setMinValues(0).setMaxValues(1).addOptions(ROLES.Teyvat)),
new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Mondstadt').setPlaceholder('Mondstadt').setMinValues(0).setMaxValues(1).addOptions(ROLES.Mondstadt)),
new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Liyue').setPlaceholder('Liyue').setMinValues(0).setMaxValues(1).addOptions(ROLES.Liyue)),
new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Inazuma').setPlaceholder('Inazuma').setMinValues(0).setMaxValues(1).addOptions(ROLES.Inazuma)),
new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Snezhnaya').setPlaceholder('Snezhnaya').setMinValues(0).setMaxValues(1).addOptions(ROLES.Snezhnaya))];


// Action row for Character roles select menus (sumeru - khaenriah)
/*
const ACTIONROW_2 = [
//new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Sumeru').setPlaceholder('Sumeru').setMinValues(0).setMaxValues(1).addOptions(Sumeru)),
//new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Fontaine').setPlaceholder('Fontaine').setMinValues(0).setMaxValues(1).addOptions(Fontaine)),
//new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Natlan').setPlaceholder('Natlan').setMinValues(0).setMaxValues(1).addOptions(Natlan)),
//new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Khaenriah').setPlaceholder('Khaenri\'ah').setMinValues(0).setMaxValues(1).addOptions(Khaenriah))
;
*/

module.exports.Create = function (client) {
	client.on('messageCreate', async (message) => {
		const msg = message.content.toLowerCase();
		// Check to see if user has privledges if (!(message.member.roles.cache.has('925164302082662460') || message.member.roles.cache.has('925163038712135700') || message.member.roles.cache.has('925160493709131826'))) return;
		if (!(message.member.roles.cache.has('913368575102828564'))) return;

		if (msg === ".characterroles-send") {
			client.channels.cache.get(CHANNEL_ID).send({embeds:[EMBED],components:ACTIONROW_1});
			//client.channels.cache.get(CHANNEL_ID).send({components:ACTIONROW_2});
		} else if (msg === ".characterroles-update") {
			// Searches through all messages and components in roles channel to find one that has matching SelectMenuIDs. Then it updates the components to the new configuration.
			const channel_messages = await client.channels.cache.get(CHANNEL_ID).messages.fetch({limit:100});
			let reply = "";
			
			for (const channel_message of channel_messages.toJSON()) {
				console.log(channel_message);
				if (!channel_message.components) continue;
				for (const message_component of channel_message.components) {
					if (message_component.components.length > 0 && message_component.components[0].customId == 'genshinMainRoleGiver-Teyvat') {
						channel_message.edit({components:ACTIONROW_1});
						reply += "+Successfully Updated ACTIONROW_1\n";
						continue;
					}
					/*if (message_component.customId == 'genshinMainRoleGiver-Sumeru') {
						channel_message.edit({components:ACTIONROW_2});
						reply += "+Successfully Updated ACTIONROW_2\n";
						continue;
					}*/
				}
			}
			if (reply == "") reply = "Failed to update character role selection. Please use `.characterroles-send` to create a new message.";
			message.reply({content:reply});
		}
	});
	
	client.on('interactionCreate', async (interaction) => {
		if (!interaction.isMessageComponent() || !interaction.customId.includes('genshinMainRoleGiver')) return;

		let memberRoles = interaction.member.roles.cache;
		if (!memberRoles) return; 
		let selectValues = interaction.values;
		if (!selectValues) return;

		// Iterate all character roles. If user has a character role that they unselected then remove that role.
		for (const REGION in ROLES) {
			for (const ROLE_OPTION of ROLES[REGION]) {
				if (memberRoles.has(ROLE_OPTION.value) && !selectValues.includes(ROLE_OPTION.value)) {
					let role = await interaction.guild.roles.fetch(ROLE_OPTION.value);
					interaction.member.roles.remove(role);
				}
			}
		}

		if (interaction.values.length < 1) {
			if (interaction.replied) {
				interaction.editReply({content:'Removed Character Icon', ephemeral:true});
			} else {
				interaction.reply({content:'Removed Character Icon', ephemeral:true});
			}
			return;
		}

		// Add selected roles
		for (const value of selectValues) {
			let role = await interaction.guild.roles.fetch(value);
			interaction.member.roles.add(role);
		}

		if (interaction.replied) {
			interaction.editReply({content:'Updated Character Icon', ephemeral:true});
		} else {
			interaction.reply({content:'Updated Character Icon', ephemeral:true});
		}
	});
}

