const { MessageEmbed } = require("discord.js");
const config = require("../../Config/config.json");

module.exports = {
  name: "ban",
  category: "moderacion",
  description: "Banea a el miembro mencionado.",
  usage: "ban <@user> <reason>",
  type: "TEXT",
  userPerms: ["BAN_MEMBERS"],
  run: async (client, message, args) => {
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Sin razón especificada";

    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!target) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("#00ffff")
            .setTitle("Banear a un usuario")
            .setDescription(`¡Uso incorrecto! El uso es: \`!ban <@user> <reason>\``)
        ]
      });
    }

    if (target.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("No puedes banear a este usuario.");
    if (target.permissions.has("BAN_MEMBERS") || target.permissions.has("ADMINISTRATOR")) return message.channel.send("No puedes banear a este usuario.");
    if (target.id === message.author.id) return message.reply(`Desafortunadamente, no te puedes banear a ti mismo.`);
    if (target.id === message.guild.ownerId) return message.reply(`¡No puedes banear al propietario del servidor!`);
    

    let embed = new MessageEmbed()
      .setTitle("Banear a un usuario")
      .addField("Sancionado", `${target.user.tag} (${target.id})`)
      .addField("Moderador", `${message.author.tag} (${message.author.id})`)
      .addField("Razón", reason)
      .setColor("#00ffff")
      .setTimestamp()
      .setThumbnail(target.avatarURL);

    target.ban({ reason: reason })
      .then(() => message.guild.channels.cache.find(c => c.name == config.logsChannels.sanciones).send({ embeds: [embed] }));
  },
};
