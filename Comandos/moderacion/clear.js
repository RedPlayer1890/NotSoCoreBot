module.exports = {
  name: "clear",
  description: "Elimina la cantidad de mensajes especificada.",
  category: "moderacion",
  usage: "clear <cantidad>",
  type: "TEXT",
  userPerms: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
   
    const fetched = message.channel || message.mentions.channels.first();
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("#00ffff")
            .setTitle("Eliminar mensajes")
            .setDescription(`¡Uso incorrecto! El uso es: \`!clear <cantidad>\` (máximo a eliminar: 99)`)
        ]
      });
    }
    if (amount <= 1 || amount > 100) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("#00ffff")
            .setTitle("Eliminar mensajes")
            .setDescription(`¡Uso incorrecto! El uso es: \`!clear <cantidad> (mención al canal [opcional])\` (máximo a eliminar: 99, mínimo a eliminar: 2)`)
        ]
      });
    }

    fetched.bulkDelete(amount, true);
    fetched.bulkDelete(amount);
  },
};
