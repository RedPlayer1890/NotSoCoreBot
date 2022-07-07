const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "servericon",
  description: "Retorna el ícono de el servidor.",
  usage: "servericon",
  category: "general",
  userPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    const server = message.guild;
    const embed = new MessageEmbed()
      .setTitle(`Ícono de ${message.guild.name}`)
      .setDescription(
        `[Enlace de el ícono](${server.iconURL({
          size: 2048,
          dynamic: true,
          format: "png",
        })})`
      )
      .setImage(server.iconURL({ size: 2048, dynamic: true, format: "png" }))
      .setColor("#00ffff");
    message.channel.send({ embeds: [embed] });
    message.delete();
  },
};
