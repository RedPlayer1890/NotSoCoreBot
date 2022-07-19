const { MessageEmbed } = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new MessageEmbed()
          .setTitle(`🎁 ¡Felicidades, eres el ganador!`)
          .setColor("#2F3136")
          .setDescription(`¡Hola, ${member.user}!\n Debido a un re-roll en **[este sorteo](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}), has ganado el premio **${giveaway.prize}**.\n¡Abre un ticket en el servidor para reclamar tu premio!`)
          .setTimestamp()
          .setFooter(member.user.username, member.user.displayAvatarURL())
        ]
      }).catch(e => { console.log(e); });
    });
  }
}