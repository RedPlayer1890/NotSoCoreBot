const 
    TConfig = require('../Config/Tickets-Config.js'),
    { _ticketsQuestions } = require('../Config/Tickets Questions'),
    config = require('../Config/config.json'),
    { MessageEmbed } = require('discord.js'),
    { ifNotSupportRole } = require('../Utils/Functions'),
    { newTicket } = require('../database/admin');

module.exports = async function (interaction) {

    const guild = interaction.guild;
    const user = interaction.user;
    const AyudaGeneral = guild.channels.cache.find(c => c.name === TConfig.categories.TicketsAG.name && c.type === 'GUILD_CATEGORY');

    interaction.message.delete();

    const staffRole = guild.roles.cache.find(r => r.name === config.rolesInfo.Staff);

    if (!staffRole) ifNotSupportRole({
        guild: guild
    });

    const channel = interaction.channel;

    channel.setParent(AyudaGeneral);
    channel.setTopic(`ID: ${user.id}`);
    channel.setName(`ayuda-${interaction.user.tag}`);

    newTicket(channel.id, true);

    let embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`¡Bienvenido ${user.username}, al soporte de ${guild.name}!`)
        .setDescription(`Responde las preguntas que el bot te hará, para poder continuar.\n\n¡Recuerda! Tienes 60 segundos para responder a cada pregunta.`)
        .setTimestamp();

    channel.send({
        content: `${user}`,
        embeds: [embed]
    }).then(() => {
        let pregunta1 = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(_ticketsQuestions.TicketsAG.primera);
        channel.send({
            embeds: [pregunta1]
        });
        channel.awaitMessages({
            filter: m => m.author.id === user.id && !m.author.bot,
            max: 1
        }).then(async mensaje => {
            let respuesta1;
            if (mensaje.first().content === ``) {
                if (mensaje.first().attachments.size === 0) respuesta1 = mensaje.first().content;
                respuesta1 = mensaje.first().attachments.map(m => `${m.proxyURL}`).join(`\n`);
            }
            if (mensaje.first().content !== ``) {
                if (mensaje.first().attachments && mensaje.first().attachments.size !== 0)
                    respuesta1 = `\n> **Texto**\n${mensaje.first().content}\n\n> **Enlaces Incluidos**\n${mensaje.first().attachments.map(m => `${m.proxyURL}`).join(`\n`)}`
            }

            respuesta1 = mensaje.first().content;


            channel.bulkDelete(15);
            var Resultados = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Ticket de Ayuda General.`)
                .setAuthor(`${guild.name}`, guild.iconURL())
                .setDescription(`> **${_ticketsQuestions.TicketsAG.primera}**\n- ${respuesta1}`)
                .setTimestamp();
            channel.send({
                content: `${user}, ${staffRole}`,
                embeds: [Resultados]
            });
        });
    });
}