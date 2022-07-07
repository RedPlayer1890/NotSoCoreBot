const { MessageEmbed } = require("discord.js");
const config = require("../../Config/config.json");

module.exports = {
  name: "softban",
  description: "Banea durante un día a un usuario.",
  category: "moderation",
  usage: "softban <@user> <reason>",
  userPerms: ["BAN_MEMBERS"],
  run: async (client, message, args) => {
    message.delete();

    let banMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!banMember)
      return message.channel.send("Please provide a user to ban!");
    if (banMember.id === message.guild.owner.id)
      return message.channel.send("You cannot SoftBan the Server Owner");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given!";

    banMember.send({
        embeds: [
          new MessageEmbed()
            .setTitle(`${message.guild.name} - Softban`)
            .setDescription(`⚠ - Has sido baneado en **${message.guild.name}** debido a ${reason}.\n\nNo te preocupes, podrás entrar de nuevo en un día.`)
            .setColor("#00ffff")
            .setImage(message.guild.iconURL({ dynamic: true }))
        ]
      }).then(() => message.guild.member(banMember).ban(banMember, { days: 1, reason: reason }))
      .then(() => message.guild.members.unban(banMember.id).catch((err) => console.log(err)));

    let embed = new MessageEmbed()
      .setThumbnail(banMember.user.displayAvatarURL())
      .setColor("RANDOM")
      .addField("Moderation:", "SOFT BAN")
      .addField("Usuario sancionado:", banMember.user.username)
      .addField("Moderador:", message.author.username)
      .addField("Razón:", reason)
      .setTimestamp();

    message.guild.channels.cache.find(c => c.name == config.logsChannels.sanciones).send({ embeds: [embed] });
  },
};
