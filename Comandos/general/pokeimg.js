const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "pokeimg",
  description: "Get Image of the Mentioned Pokemon",
  usage: "pokeimg <pokemon>",
  type: "TEXT",
  category: "general",
  userPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    const state = "enabled";
    if (state === "disabled") {
      return message.channel.send("El comando está deshabilitado o no tienes permiso de usarlo.");
    }
    const name = args.join(" ");
    if (!name) {
      return message.channel.send("Ingresa el nombre de un pokemon");
    }
    const link = `https://i.some-random-api.ml/pokemon/${name}.png`;
    const embed = new MessageEmbed()
      .setTitle(`${name}`)
      .setImage(link)
      .setColor("#00ffff");

    message.channel.send({embeds: [embed]});
  },
};
