const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const CHANNEL_ID = '925168032274350130';
const GUILD_ID = '925159676193173534';
const ROLES = require('./roles.json').CHARACTER_ROLES;

// Embed for Character roles
const EMBED = new MessageEmbed()
.setColor('#eb7b36')
.setTitle('(Optional) Character roles.')
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
		// Check to see if user has privledges
		const guild = await client.guilds.fetch(GUILD_ID);
		const member = await guild.members.fetch(message.author.id);
		if (!member) return;
		const member_roles = member.roles.cache;
		if (!(member_roles.has('925164302082662460') || member_roles.has('925163038712135700') || member_roles.has('925160493709131826'))) return;

		if (msg === ".characterroles-send") {
			client.channels.cache.get(CHANNEL_ID).send({embeds:[EMBED],components:ACTIONROW_1});
			//client.channels.cache.get(CHANNEL_ID).send({components:ACTIONROW_2});
		} else if (msg === ".characterroles-update") {
			// Searches through all messages and components in roles channel to find one that has matching SelectMenuIDs. Then it updates the components to the new configuration.
			// fetch all messages in channel
			const channel_messages_collection = await client.channels.cache.get(CHANNEL_ID).messages.fetch({limit:100});
			const channel_messages = channel_messages_collection.toJSON();
			let reply = "";
			
			// iterate all messages in channel
			for (const channel_message of channel_messages) {
				if (!channel_message.components) continue;
				// iterate all components in message
				for (const message_component of channel_message.components) {
					// check if component has a select menu and select menu matches customId
					if (message_component.components.length > 0 && message_component.components[0].customId == 'genshinMainRoleGiver-Teyvat') {
						// edit message with updated action row
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
		if (!(interaction.isMessageComponent() && interaction.customId.includes('genshinMainRoleGiver'))) return;

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

