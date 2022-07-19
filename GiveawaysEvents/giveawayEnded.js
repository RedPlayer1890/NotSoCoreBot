const { MessageEmbed } = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new MessageEmbed()
          .setTitle(`🎁 ¡Felicidades!`)
          .setColor("#2F3136")
          .setDescription(`¡Hola, ${member.user}!\n ¡Has ganado **[[este sorteo]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})!**\n ¡Felicidades por ganar **${giveaway.prize}!**\nAbre un ticket para reclamar tu premio.`)
          .setTimestamp()
          .setFooter(member.user.username, member.user.displayAvatarURL())
        ]
      }).catch(e => {
        console.log(e);
      });
    });

  }
}