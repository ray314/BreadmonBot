require('dotenv').config();
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Intents, Client } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const Teyvat = [
  {
    label: "Aether",
    value: '981372309736665178'
  },
  {
    label: "Lumine",
    value: '981430148899434527'
  },
  {
    label: "Aloy",
    value: '981374266907955260'
  }
];
const Mondstadt = [
  {
    label: "Albedo",
    value: '981374176411676742'
  },
  {
    label: "Amber",
    value: '981426163249446943'
  },
  {
    label: "Barbara",
    value: '981426592926535722'
  },
  {
    label: "Bennett",
    value: '981426779937988668'
  },
  {
    label: "Diluc",
    value: '981426906794721320'
  },
  {
    label: "Diona",
    value: '981426942756667443'
  },
  {
    label: "Eula",
    value: '981427034347696138'
  },
  {
    label: "Fischl",
    value: '981427047756873748'
  },
  {
    label: "Jean",
    value: '981427442046603334'
  },
  {
    label: "Kaeya",
    value: '981429485217923153'
  },
  {
    label: "Klee",
    value: '981429763702923314'
  },
  {
    label: "Lisa",
    value: '981430079626301480'
  },
  {
    label: "Mona",
    value: '981430202020290562'
  },
  {
    label: "Noelle",
    value: '981430299172933662'
  },
  {
    label: "Razor",
    value: '981431254346002453'
  },
  {
    label: "Rosaria",
    value: '981431485129195520'
  },
  {
    label: "Sucrose",
    value: '981431938067857428'
  },
  {
    label: "Venti",
    value: '981432197271674960'
  }
];
const Liyue = [
  {
    label: "Beidou",
    value: '981426643279163424'
  },
  {
    label: "Chongyun",
    value: '981426811420430356'
  },
  {
    label: "Ganyu",
    value: '981373260572819467'
  },
  {
    label: "Hu Tao",
    value: '981427315454132225'
  },
  {
    label: "Keqing",
    value: '981429697487470603'
  },
  {
    label: "Ningguang",
    value: '981430250246381609'
  },
  {
    label: "Qiqi",
    value: '981431189116190721'
  },
  {
    label: "Shenhe",
    value: '981431873450430474'
  },
  {
    label: "Xiangling",
    value: '981432432479834114'
  },
  {
    label: "Xiao",
    value: '981432485328060429'
  },
  {
    label: "Xinqiu",
    value: '981432530857263126'
  },
  {
    label: "Xinyan",
    value: '981432573894987846'
  },
  {
    label: "Yanfei",
    value: '981432747115569182'
  },
  {
    label: "Yelan",
    value: '981432803092758599'
  },
  {
    label: "Yun Jin",
    value: '981433162473291817'
  },
  {
    label: "Zhongli",
    value: '981433217229926452'
  }
];
const Inazuma = [
  {
    label: "Ayaka",
    value: '981426501327147078'
  },
  {
    label: "Ayato",
    value: '981426553986633758'
  },
  {
    label: "Gorou",
    value: '981427178094862376'
  },
  {
    label: "Itto",
    value: '981427387583565864'
  },
  {
    label: "Kazuha",
    value: '981429549613060156'
  },
  {
    label: "Kokomi",
    value: '981430007811432448'
  },
  {
    label: "Raiden",
    value: '981431245789597769'
  },
  {
    label: "Sara",
    value: '981431542272364574'
  },
  {
    label: "Sayu",
    value: '981431621217554433'
  },
  {
    label: "Yae",
    value: '981432621647147019'
  },
  {
    label: "Yoimiya",
    value: '981433039731195975'
  }
];
const Sneznaya = [
  {
    label: "Tartaglia",
    value: '981432083073343538'
  },
  {
    label: "Tartaglia",
    value: '981659899765354558'
  }
];

// There are 3 steps to adding a new region. 
// STEP 1: Uncomment the respective character list and fill it with whatever role information you want.
/*
const Sumeru = [
  {
    label: "UNIT_NAME",
    value: 'ROLE_ID'
  }
];
*/
/*
const Fontaine = [
  {
    label: "UNIT_NAME",
    value: 'ROLE_ID'
  }
];
*/
/*
const Natlan = [
  {
    label: "UNIT_NAME",
    value: 'ROLE_ID'
  }
];
*/
/*
const Khaenriah = [
  {
    label: "UNIT_NAME",
    value: 'ROLE_ID'
  }
];
*/

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity(':PaimogemsRain:', { type: 'LISTENING' });
  this.Create(client);
});

module.exports.Create = function (client) {
  client.on('ready', () => {
    client.channels.fetch('925168032274350130').then(channel => {
      if (channel) {
        let EMBED = new MessageEmbed()
          .setColor('#eb7b36')
          .setTitle('(Optional) Character roles')
          .setDescription('Choose a Genshin character to display next to your name.')
          .setThumbnail('https://media.discordapp.net/attachments/484247847383072771/981468208307503134/xiao.png');
        let TeyvatSelect = new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Teyvat').setPlaceholder('Teyvat').setMinValues(0).setMaxValues(1).addOptions(Teyvat);
        let MondstadtSelect = new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Mondstadt').setPlaceholder('Mondstadt').setMinValues(0).setMaxValues(1).addOptions(Mondstadt);
        let LiyueSelect = new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Liyue').setPlaceholder('Liyue').setMinValues(0).setMaxValues(1).addOptions(Liyue);
        let InazumaSelect = new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Inazuma').setPlaceholder('Inazuma').setMinValues(0).setMaxValues(1).addOptions(Inazuma);
        let SneznayaSelect = new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Sneznaya').setPlaceholder('Sheznaya').setMinValues(0).setMaxValues(1).addOptions(Sneznaya);

        channel.send({ embeds: [EMBED], components: [new MessageActionRow().addComponents(TeyvatSelect), new MessageActionRow().addComponents(MondstadtSelect), new MessageActionRow().addComponents(LiyueSelect), new MessageActionRow().addComponents(InazumaSelect), new MessageActionRow().addComponents(SneznayaSelect)] });

        // STEP 2: The other 4 menus will have to go into another message. To add a region uncomment the Select variable, then uncomment the channel.send call and whichever regions to be sent.
        // This adds the select menu component to the message which gets sent.

        //let SumeruSelect = new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Sumeru').setPlaceholder('Sumeru').setMinValues(0).setMaxValues(1).addOptions(Sumeru);
        //let FontaineSelect = new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Fontaine').setPlaceholder('Fontaine').setMinValues(0).setMaxValues(1).addOptions(Fontaine);
        //let NatlanSelect = new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Natlan').setPlaceholder('Natlan').setMinValues(0).setMaxValues(1).addOptions(Natlan);
        //let KhaenriahSelect = new MessageSelectMenu().setCustomId('genshinMainRoleGiver-Khaenriah').setPlaceholder('Khaenri\'ah').setMinValues(0).setMaxValues(1).addOptions(Khaenriah);

        //channel.send({components:[new MessageActionRow().addComponents(SumeruSelect)
        //, new MessageActionRow().addComponents(FontaineSelect)
        //, new MessageActionRow().addComponents(NatlanSelect)
        //, new MessageActionRow().addComponents(KhaenriahSelect)
        //]});

      }
    });
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isMessageComponent() || !interaction.customId.includes('genshinMainRoleGiver')) return;

    let memberRoles = interaction.member.roles.cache;
    if (!memberRoles) return;
    let selectValues = interaction.values;
    if (!selectValues) return;

    // WELCOME TO FOR LOOP HELL
    for (const roleOption of Teyvat) {
      if (memberRoles.has(roleOption.value) && !selectValues.includes(roleOption.value)) {
        let role = await interaction.guild.roles.fetch(roleOption.value);
        interaction.member.roles.remove(role);
      }
    }

    for (const roleOption of Mondstadt) {
      if (memberRoles.has(roleOption.value) && !selectValues.includes(roleOption.value)) {
        let role = await interaction.guild.roles.fetch(roleOption.value);
        interaction.member.roles.remove(role);
      }
    }

    for (const roleOption of Liyue) {
      if (memberRoles.has(roleOption.value) && !selectValues.includes(roleOption.value)) {
        let role = await interaction.guild.roles.fetch(roleOption.value);
        interaction.member.roles.remove(role);
      }
    }

    for (const roleOption of Inazuma) {
      if (memberRoles.has(roleOption.value) && !selectValues.includes(roleOption.value)) {
        let role = await interaction.guild.roles.fetch(roleOption.value);
        interaction.member.roles.remove(role);
      }
    }

    for (const roleOption of Sneznaya) {
      if (memberRoles.has(roleOption.value) && !selectValues.includes(roleOption.value)) {
        let role = await interaction.guild.roles.fetch(roleOption.value);
        interaction.member.roles.remove(role);
      }
    }
    // STEP 3: Uncomment the region's for loop
    // This makes it so whenever a user chooses a new role, it will iterate the character list to check if they have roles that need to be removed.

    /*
    for (const roleOption of Sumeru) {
      if (memberRoles.has(roleOption.value) && !selectValues.includes(roleOption.value)) {
        let role = await interaction.guild.roles.fetch(roleOption.value);
        interaction.member.roles.remove(role);
      }
    }

    for (const roleOption of Fontaine) {
      if (memberRoles.has(roleOption.value) && !selectValues.includes(roleOption.value)) {
        let role = await interaction.guild.roles.fetch(roleOption.value);
        interaction.member.roles.remove(role);
      }
    }

    for (const roleOption of Natlan) {
      if (memberRoles.has(roleOption.value) && !selectValues.includes(roleOption.value)) {
        let role = await interaction.guild.roles.fetch(roleOption.value);
        interaction.member.roles.remove(role);
      }
    }

    for (const roleOption of Khaenriah) {
      if (memberRoles.has(roleOption.value) && !selectValues.includes(roleOption.value)) {
        let role = await interaction.guild.roles.fetch(roleOption.value);
        interaction.member.roles.remove(role);
      }
    }*/

    if (interaction.values.length < 1) {
      if (interaction.replied) {
        interaction.editReply({ content: 'Removed Character Icon', ephemeral: true });
      } else {
        interaction.reply({ content: 'Removed Character Icon', ephemeral: true });
      }
      return;
    }

    for (const value of selectValues) {
      let role = await interaction.guild.roles.fetch(value);
      interaction.member.roles.add(role);
    }

    if (interaction.replied) {
      interaction.editReply({ content: 'Updated Character Icon', ephemeral: true });
    } else {
      interaction.reply({ content: 'Updated Character Icon', ephemeral: true });
    }
  });
}

client.login(process.env.TOKEN);