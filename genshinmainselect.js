const { ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, EmbedBuilder, ActionRow,
		InteractionType,
		ButtonStyle,  } = require('discord.js');
const CHANNEL_ID = '925168032274350130';
const GUILD_ID = '925159676193173534';
const ROLES = require('./roles.json').CHARACTER_ROLES;

// Embed for Character roles
const EMBED = new EmbedBuilder()
.setColor('#eb7b36')
.setTitle('(Optional) Character roles.')
.setDescription('Choose a Genshin character to display next to your name.')
.setThumbnail('https://cdn.discordapp.com/attachments/925162470107123752/981845568567513099/Icon_Emoji_054_Ganyu_No_touching21.png');

const actionrow_1_regions = ['Teyvat', 'Mondstadt', 'Liyue', 'Inazuma', 'Sumeru'];
const actionrow_2_regions = ['Snezhnaya'];
// Action row for Character roles select menus (teyvat - snezhnaya)
const ACTIONROW_1 = (function() {
	let actionrow1 = [];
	for (let key of actionrow_1_regions) {
		actionrow1.push(initRegionSelect(key));
	}
	
	return actionrow1;	
})();

const ACTIONROW_2 = (function() {
	let actionrow2 = [];
	for (let key of actionrow_2_regions) {
		actionrow2.push(initRegionSelect(key));
	}
	actionrow2.push(new ActionRowBuilder()
	.addComponents(new ButtonBuilder()
	.setCustomId('genshinMainRemoveRoles')
	.setLabel('Remove')
	.setStyle(ButtonStyle.Danger)));
	return actionrow2;	
})();

function initRegionSelect(region) {
	return new ActionRowBuilder()
	.addComponents(new SelectMenuBuilder().setCustomId(`genshinMainRoleGiver-${region}`)
	.setPlaceholder(region)
	.setMinValues(0)
	.setMaxValues(1)
	.addOptions(ROLES[region]));
}


module.exports.Create = function (client) {
	client.on('messageCreate', (message) => {
		const msg = message.content.toLowerCase();
		if (!(msg === ".characterroles-send" || msg === ".characterroles-update")) return;
		// Check to see if user has privledges
		client.guilds.fetch(GUILD_ID).then(guild => {
			guild.members.fetch(message.author.id).then(async member => {
				if (!member) return;
				const member_roles = member.roles.cache;
				if (!(member_roles.has('925164302082662460') || member_roles.has('925163038712135700') || member_roles.has('925160493709131826'))) return;
				switch (msg) {
					case ".characterroles-send":
						client.channels.cache.get(CHANNEL_ID).send({embeds:[EMBED],components:ACTIONROW_1});
						client.channels.cache.get(CHANNEL_ID).send({components:ACTIONROW_2});
						break;
					case ".characterroles-update":
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
								// iterate all components in action row
								for (const action_component of message_component.components) {
									// check if component has a select menu and select menu matches customId
									if (action_component.customId == 'genshinMainRoleGiver-Teyvat') {
										// edit message with updated action row
										channel_message.edit({components:ACTIONROW_1});
										reply += "+Successfully Updated ACTIONROW_1\n";
										continue;
									}

									if (action_component.customId == 'genshinMainRemoveRoles') {
										// edit message with updated action row
										channel_message.edit({components:ACTIONROW_2});
										reply += "+Successfully Updated ACTIONROW_2\n";
										continue;
									}
								}
								
							}
						}
						if (reply == "") reply = "Failed to update character role selection. Please use `.characterroles-send` to create a new message.";
						message.reply({content:reply});
						break;
				}
			}).catch(error => {
				console.log(error);
			});
		}).catch(error => {
			console.log(error);
		});
	});
		
		client.on('interactionCreate', async (interaction) => {
			if (!interaction.type === InteractionType.MessageComponent) return;
				let memberRoles = interaction.member.roles.cache;
				if (!memberRoles) return; 
			if (!memberRoles) return; 
				if (!memberRoles) return; 
			if (!memberRoles) return; 
				if (!memberRoles) return; 
			if (interaction.customId.includes('genshinMainRoleGiver')) {
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
			} else if (interaction.customId == 'genshinMainRemoveRoles') {
				for (const REGION in ROLES) {
					for (const ROLE_OPTION of ROLES[REGION]) {
						if (memberRoles.has(ROLE_OPTION.value)) {
							let role = await interaction.guild.roles.fetch(ROLE_OPTION.value);
							interaction.member.roles.remove(role);
						}
					}
				}
				
				if (interaction.replied) {
					interaction.editReply({content:'Removed Character Icon', ephemeral:true});
				} else {
					interaction.reply({content:'Removed Character Icon', ephemeral:true});
				}
			}
	});
}
