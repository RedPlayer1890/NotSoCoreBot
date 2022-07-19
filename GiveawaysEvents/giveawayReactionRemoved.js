const { MessageEmbed } = require("discord.js")
module.exports = {
  async execute(giveaway, member) {
    return member.send({
      embeds: [new MessageEmbed()
        .setTimestamp()
        .setTitle('¿Has removido la reacción de un sorteo?')
        .setColor("#2F3136")
        .setDescription(`Tu entrada a [este sorteo](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) fue guardada. Pero, como sacastee la reacción, me imagino que no necesitas **${giveaway.prize}**... Que pena 😔`)
        .setFooter("¿Fue un error? ¡Reacciona de nuevo!")
      ]
    }).catch(e => { console.log(e); });

  }
}