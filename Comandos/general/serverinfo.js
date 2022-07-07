const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  name: "serverinfo",
  category: "general",
  description: "Shows info about a server",
  usage: "serverinfo",
  userPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    //command
    const mention = message.member;
    const afk = message.guild.afkChannel === null ? "`Sin canal AFK`" : message.guild.afkChannel;
    let servericon = message.guild.iconURL;
    let verifLevels = {
      NONE: "Ninguna",
      LOW: "Baja",
      MEDIUM: "Media",
      HIGH: "(╯°□°）╯︵  ┻━┻ (Alta)",
      VERY_HIGH: "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻ (Muy alta)",
    };
    let region = {
      brazil: "Brasil",
      "eu-central": "Europa central",
      singapore: "Singapur",
      "us-central": "Estados Unidos central",
      sydney: "Sydney",
      "us-east": "Estados Unidos este",
      "us-south": "Estados Unidos sur",
      "us-west": "Estados Unidos oeste",
      "eu-west": "Europa oeste",
      "vip-us-east": "VIP Estados Unidos este",
      london: "Londres",
      amsterdam: "Amsterdam",
      hongkong: "Hong Kong",
      russia: "Rusia",
      southafrica: "Sur áfrica",
      india: "India",
    };
    const serverembed = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL())
      .setThumbnail(servericon)
      .addField(
        `Información de el servidor`,
        `Dueño: ${message.guild.owner} \nRegión: \`${
          region[message.guild.region]
        }\` \nNivel de vertificación: \`${
          verifLevels[message.guild.verificationLevel]
        }\``
      )
      .addField(
        `Información general`,
        `Canales totales: \`${
          message.guild.channels.cache.size
        }\` \nCanales de texto: \`${
          message.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size
        }\` \nCanales de voz: \`${
          message.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size
        }\` \nCanal AFK: ${afk} \nTiempo para considerar AFK: \`${
          message.guild.afkTimeout
        } segundos\` \nRoles totales: \`${
          message.guild.roles.cache.size
        }\` \nEmojis totales: \`${message.guild.emojis.cache.size}\``
      )
      .addField(
        `Información de miembros`,
        `Miembros totales: \`${message.guild.memberCount}\` \nHumanos: \`${
          message.guild.members.cache.filter((member) => !member.user.bot).size
        }\` \nBots: \`${
          message.guild.members.cache.filter((member) => member.user.bot).size
        }\``
      )
      .addField(
        `Información adicional`,
        `Te uniste el: \n\`${moment(mention.joinedAt).format(
          "dddd, MMMM Do YYYY, h:mm:ss A"
        )}\` \nGuild creada el: \n\`${moment(message.guild.createdAt).format(
          "dddd, MMMM Do YYYY, h:mm:ss A"
        )}\``
      )
      .setThumbnail(message.guild.iconURL())
      .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL())
      .setColor("#00ffff")
      .setTimestamp();

    message.channel.send({ embeds: [serverembed] });
  },
};
