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
    const ReportesStaff = guild.channels.cache.find(c => c.name === TConfig.categories.TicketsRepStaff.name && c.type === 'GUILD_CATEGORY');

    interaction.message.delete();

    const staffRole = guild.roles.cache.find(r => r.name === config.rolesInfo.Staff);

    if (!staffRole) ifNotSupportRole({
        guild: guild
    });

    const channel = interaction.channel;

    channel.setParent(ReportesStaff);
    channel.setTopic(`ID: ${user.id}`);
    channel.setName(`reporte-staff-${interaction.user.tag}`);

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
            .setDescription(_ticketsQuestions.TicketsRepStaff.primera);
        channel.send({
            embeds: [pregunta1]
        });
        channel.awaitMessages({
            filter: m => m.author.id === user.id && !m.author.bot,
            max: 1
        }).then(async mensaje => {

            var respuesta;

            if (mensaje.first().content === ``) {
                if (mensaje.attachments.size === 0) respuesta = mensaje.first.content();
                respuesta = mensaje.attachments.map(m => `${m.proxyURL}`).join(`\n`);
            }
            if (mensaje.first().content !== ``) {
                if (mensaje.attachments && mensaje.attachments.size !== 0)
                    respuesta = `\n> **Texto**\n${ mensaje.first().content}\n\n> **Enlaces Incluidos**\n${mensaje.attachments.map(m => `${m.proxyURL}`).join(`\n`)}`;
            }
            
            respuesta = mensaje.first().content;

            let pregunta2 = new MessageEmbed()
                .setColor('#0099ff')
                .setDescription(_ticketsQuestions.TicketsRepStaff.segunda);
            channel.send({
                embeds: [pregunta2]
            });
            channel.awaitMessages({
                filter: m => m.author.id === user.id && !m.author.bot,
                max: 1
            }).then(async mensaje2 => {

                var respuesta2;

                if (mensaje2.first().content === ``) {
                    if (mensaje2.attachments.size === 0) respuesta2 = mensaje2.first.content();
                    respuesta2 = mensaje2.attachments.map(m => `${m.proxyURL}`).join(`\n`);
                }
                if (mensaje2.first().content !== ``) {
                    if (mensaje2.attachments && mensaje2.attachments.size !== 0)
                        respuesta2 = `\n> **Texto**\n${ mensaje2.first().content}\n\n> **Enlaces Incluidos**\n${mensaje2.attachments.map(m => `${m.proxyURL}`).join(`\n`)}`;
                }
                
                respuesta2 = mensaje2.first().content;

                let pregunta3 = new MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription(_ticketsQuestions.TicketsRepStaff.tercera);
                channel.send({
                    embeds: [pregunta3]
                });
                channel.awaitMessages({
                    filter: m => m.author.id === user.id && !m.author.bot,
                    max: 1
                }).then(async mensaje3 => {

                    var respuesta3;

                    if (mensaje3.first().content === ``) {
                        if (mensaje3.attachments.size === 0) respuesta3 = mensaje3.first.content();
                        respuesta3 = mensaje3.attachments.map(m => `${m.proxyURL}`).join(`\n`);
                    }
                    if (mensaje3.first().content !== ``) {
                        if (mensaje3.attachments && mensaje3.attachments.size !== 0)
                            respuesta3 = `\n> **Texto**\n${ mensaje3.first().content}\n\n> **Enlaces Incluidos**\n${mensaje3.attachments.map(m => `${m.proxyURL}`).join(`\n`)}`;
                    }
                    
                    respuesta3 = mensaje3.first().content;

                    let pregunta4 = new MessageEmbed()
                        .setColor('#0099ff')
                        .setDescription(_ticketsQuestions.TicketsRepStaff.cuarta);
                    channel.send({
                        embeds: [pregunta4]
                    });
                    channel.awaitMessages({
                        filter: m => m.author.id === user.id && !m.author.bot,
                        max: 1
                    }).then(async mensaje4 => {

                        var respuesta4;

                        if (mensaje4.first().content === ``) {
                            if (mensaje4.attachments.size === 0) respuesta4 = mensaje4.first.content();
                            respuesta4 = mensaje4.attachments.map(m => `${m.proxyURL}`).join(`\n`);
                        }
                        if (mensaje4.first().content !== ``) {
                            if (mensaje4.attachments && mensaje4.attachments.size !== 0)
                                respuesta4 = `\n> **Texto**\n${ mensaje4.first().content}\n\n> **Enlaces Incluidos**\n${mensaje4.attachments.map(m => `${m.proxyURL}`).join(`\n`)}`;
                        }
                        
                        respuesta4 = mensaje4.first().content;

                        let pregunta5 = new MessageEmbed()
                            .setColor('#0099ff')
                            .setDescription(_ticketsQuestions.TicketsRepStaff.quinta);
                        channel.send({
                            embeds: [pregunta5]
                        });
                        channel.awaitMessages({
                            filter: m => m.author.id === user.id && !m.author.bot,
                            max: 1
                        }).then(async mensaje5 => {

                            var respuesta5;

                            if (mensaje5.first().content === ``) {
                                if (mensaje5.attachments.size === 0) respuesta5 = mensaje5.first.content();
                                respuesta5 = mensaje5.attachments.map(m => `${m.proxyURL}`).join(`\n`);
                            }
                            if (mensaje5.first().content !== ``) {
                                if (mensaje5.attachments && mensaje5.attachments.size !== 0)
                                    respuesta5 = `\n> **Texto**\n${ mensaje5.first().content}\n\n> **Enlaces Incluidos**\n${mensaje5.attachments.map(m => `${m.proxyURL}`).join(`\n`)}`;
                            }
                            
                            respuesta5 = mensaje5.first().content;

                            channel.bulkDelete(15);
                            var finalEmbed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle(`Ticket de Reporte Staff.`)
                                .setAuthor(`${guild.name}`, guild.iconURL())
                                .setDescription(`**${_ticketsQuestions.TicketsRepStaff.primera}**\n- ${respuesta}\n**${_ticketsQuestions.TicketsRepStaff.segunda}**\n- ${respuesta2}\n**${_ticketsQuestions.TicketsRepStaff.tercera}**\n- ${respuesta3}\n**${_ticketsQuestions.TicketsRepStaff.cuarta}**\n- ${respuesta4}\n**${_ticketsQuestions.TicketsRepStaff.quinta}**\n- ${respuesta5}`)
                                .setTimestamp();
                            channel.send({
                                content: `${user}, ${staffRole}`,
                                embeds: [finalEmbed]
                            });
                        });
                    });
                });
            });
        });
    });

}