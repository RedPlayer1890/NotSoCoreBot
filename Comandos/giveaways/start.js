const { MessageEmbed } = require("discord.js");
const messages = require("../../Utils/message");
const ms = require("ms");
const config = require("../../Config/config.json");

module.exports = {
  name: 'startGA',
  description: 'Inicia un sorteo',
  category: 'giveaways',
  usage: 'start <premio> <tiempo>',
  userPerms: ['MANAGE_MESSAGES'],
  type: 'SLASH',
  options: [
    {
      name: 'duración',
      description: 'Duración de el sorteo en formato de tiempo; ejemplo: 1d, 1h, 1m, 1s',
      type: 'STRING',
      required: true
    },
    {
      name: 'ganadores',
      description: 'Cantidad de ganadores que tendrá el sorteo.',
      type: 'INTEGER',
      required: true
    },
    {
      name: 'premio',
      description: 'El premio de el sorteo.',
      type: 'STRING',
      required: true
    },
    {
      name: 'canal',
      description: 'El canal donde se iniciará el sorteo.',
      type: 'CHANNEL',
      required: true
    },
    {
      name: 'rolepremium',
      description: 'El role premium del sorteo.',
      type: 'ROLE',
      required: false
    },
    {
      name: 'cantidadbonus',
      description: 'La cantidad de bonos extra para el role premium.',
      type: 'INTEGER',
      required: false
    },
    {
      name: 'invitación',
      description: 'Invitación para un sorteo con requerimiento',
      type: 'STRING',
      required: false
    },
    {
      name: 'role',
      description: 'Role que quieras añadir como requerimiento de el sorteo',
      type: 'ROLE',
      required: false
    },
  ],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === config.rolesInfo.giveawaysAdmin)) {
      return interaction.reply({
        content: ':x: No tienes el permiso de iniciar sorteos.',
        ephemeral: true
      });
    }

    const giveawayChannel = interaction.options.getChannel('canal');
    const giveawayDuration = interaction.options.getString('duración');
    const giveawayWinnerCount = interaction.options.getInteger('ganadores');
    const giveawayPrize = interaction.options.getString('premio');

    if (!giveawayChannel.isText()) {
      return interaction.reply({
        content: ':x: Selecciona un canal de texto.',
        ephemeral: true
      });
    }
   if(isNaN(ms(giveawayDuration))) {
    return interaction.reply({
      content: ':x: Selecciona una duración válida.',
      ephemeral: true
    });
  }
    if (giveawayWinnerCount < 1) {
      return interaction.reply({
        content: ':x: Selecciona una cantidad de ganadores válida.',
      })
    }

    const bonusRole = interaction.options.getRole('rolepremium');
    const bonusEntries = interaction.options.getInteger('cantidadbonus');
    let rolereq = interaction.options.getRole('role')
    let invite = interaction.options.getString('invitación')

    if (bonusRole) {
      if (!bonusEntries) {
        return interaction.reply({
          content: `:x: ¡Debes específicar qué recibe como bono el role ${bonusRole}`,
          ephemeral: true
        });
      }
    }


    await interaction.deferReply({ ephemeral: true })
    let reqinvite;
    if (invite) {
      let invitex = await client.fetchInvite(invite)
      let client_is_in_server = client.guilds.cache.get(
        invitex.guild.id
      )
      reqinvite = invitex
      if (!client_is_in_server) {
        return interaction.editReply({
          embeds: [{
            color: "#2F3136",
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "¡Verificación de invitación!",
            description:
              "¡Debes invitar a este bot a tu servidor para que pueda funcionar!",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Verificación de servidor"
            }
          }]
        })
      }
    }

    if (rolereq && !invite) {
      messages.inviteToParticipate = `**Reacciona con 🎉 para participar**\n>>> - Solo los miembros con el role ${rolereq} pueden participar en este sorteo.`
    }
    if (rolereq && invite) {
      messages.inviteToParticipate = `**Reacciona con 🎉 para participar**\n>>> - Solo los miembros con el role ${rolereq} pueden participar en este sorteo.\n- Los miembros deben estar en [este servidor](${invite}) para participar en el sorteo.`
    }
    if (!rolereq && invite) {
      messages.inviteToParticipate = `**Reacciona con 🎉 para participar**\n>>> - Los miembros deben estar en [este servidor](${invite}) para participar en el sorteo.`
    }


    client.giveawaysManager.start(giveawayChannel, {
      duration: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: parseInt(giveawayWinnerCount),
      bonusEntries: [
        {
          bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
          cumulative: false
        }
      ],
      messages,
      extraData: {
        server: reqinvite == null ? "null" : reqinvite.guild.id,
        role: rolereq == null ? "null" : rolereq.id,
      }
    });
    interaction.editReply({
      content:
        `Sorteo iniciado en ${giveawayChannel}`,
      ephemeral: true
    })

    if (bonusRole) {
      let giveaway = new MessageEmbed()
        .setAuthor(`¡Alerta de bonos extra!`)
        .setDescription(
          `**El role ${bonusRole}** tiene **${bonusEntries}** bonos extras en este sorteo.`
        )
        .setColor("#2F3136")
        .setTimestamp();
      giveawayChannel.send({ embeds: [giveaway] });
    }

  }

};
