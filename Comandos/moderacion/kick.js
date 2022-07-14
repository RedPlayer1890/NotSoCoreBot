const config = require("../../Config/config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Expulsa al miembro específicado",
  category: "moderation",
  usage: "kick <@user> <reason>",
  type: "TEXT",
  userPerms: ["KICK_MEMBERS"],
  run: async (client, message, args) => {
    let target = message.mentions.members.first() || message.guild.users.cache.get(args[0]);

    if (!target) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("#00ffff")
            .setTitle("Expulsar a un usuario")
            .setDescription(`¡Uso incorrecto! El uso es: \`!kick <@user> <reason>\``)
        ]
      });
    }

    if (target.permissions.has("BAN_MEMBERS") || target.permissions.has("KICK_MEMBERS") || target.permisisons.has("ADMINISTRATOR")) return message.channel.send("No puedes banear a este usuario.");
    if (target.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("No puedes banear a este usuario.");
    if (target.id === message.guild.ownerId) return message.reply(`¡No puedes expulsar al propietario del servidor!`);
    if (target.id === message.author.id) return message.reply(`Desafortunadamente, no te puedes expulsar a ti mismo.`);
    

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Sin razón especificada";

    const embed = new MessageEmbed()
      .setTitle("Expulsar a un usuario")
      .setColor("#00ffff")
      .setThumbnail(target.user.displayAvatarURL)
      .addField("Usuario expulsado", `${target.user.tag} (${target.id})`)
      .addField("Expulsado por", `${message.author.tag} (${message.author.id})`)
      .addField("Razón", reason)
      .setTimestamp();

    target.kick(args[0]);

    message.guild.channels.cache.find(c => c.name == config.logsChannels.sanciones).send({ embeds: [embed] });
  }
};
