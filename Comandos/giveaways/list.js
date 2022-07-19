const {
  MessageSelectMenu,
  MessageActionRow,
  MessageEmbed
} = require("discord.js")

module.exports = {
  name: 'listGA',
  description: 'Lista los sorteos activos',
  type: 'SLASH',
  usage: 'listGA',
  category: 'giveaways',
  slash: async (interaction, args, client) => {
    const select = new MessageSelectMenu()
      .setCustomId("select")
      .setPlaceholder("Choose a type of giveaway to view!")
      .addOptions([{
          label: '🎉 Sorteos normales',
          description: 'Ve la lista de sorteos normales activos en tu servidor.',
          value: 'normal',
        },
        {
          label: "⚙ Sorteos con requerimientos",
          description: "¡Ve la lista de sorteos con requerimientos activos en tu server!",
          value: "guildReq"
        },
      ])
    const row = new MessageActionRow().addComponents([select])
    let giveaways = client.giveawaysManager.giveaways.filter(g => g.guildId === `${interaction.guild.id}` && !g.ended);
    if (!giveaways.some(e => e.messageId)) {
      return interaction.reply('💥 Sin sorteos activos en este servidor.')
    }
    const msg = await interaction.channel.send({
      embeds: [new MessageEmbed().setDescription("Selecciona una opción en el menú.").setColor("#2F3136").setTimestamp()],
      components: [row]
    })
    let embed = new MessageEmbed()
      .setTitle("Sorteos activos")
      .setColor("#2F3136")
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
    let embedGuild = new MessageEmbed()
      .setTitle("Sorteos con requerimientos activos")
      .setColor("#2F3136")
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
    const filter = x => x.customId == "select" && x.user.id == interaction.member.id
    const collector = await interaction.channel.createMessageComponentCollector({
      filter,
      time: 60000,
      max: 1
    })
    await interaction.deferReply()
    collector.on("collect", async (i) => {
      const val = i.values[0]
      if (val == "normal") {
        await Promise.all(giveaways.map(async (x) => {
          embed.addField(`Sorteo normal:`, `**Premio:** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})\nInicio:** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**Termina:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
        }));
        msg.delete()
        interaction.editReply({
          embeds: [embed],
          components: []
        })
      }
      if (val == "guildReq") {
        if (val == "guildReq") {
          if (!giveaways.some(e => e.extraData)) {
            interaction.editReply({
              content: '💥 Sin sorteos para mostrar',
              embeds: [],
              components: []
            })
            msg.delete()
            return
          }
        }
        await Promise.all(giveaways.map(async (x) => {
          if (x.extraData) {
            const guild = client.guilds.cache.get(x.extraData.server)
            const channel = guild.channels.cache
              .filter((channel) => channel.type === 'text')
              .first()
            const inv = await channel.createInvite()
            embedGuild.addField(`Sorteo con requerimientos:`, `**Premio:** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})**\n**Requerimiento: [Este servidor](${inv})**\n**Inició:** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**Termina:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
          }
        }));
        msg.delete()
        interaction.editReply({
          embeds: [embedGuild],
          components: []
        })

      }
    })
    collector.on("end", (collected, reason) => {
      if (reason == "time") {
        interaction.editReply({
          content: "👀 La interacción ya no es admisible. Intenta de nuevo.",
          components: []
        })
      }
    })
  },
};