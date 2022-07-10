const 
    TConfig = require('../Config/Tickets-Config.js'), 
    { _ticketsQuestions } = require('../Config/Tickets Questions'),
    config = require('../Config/config.json'), 
    { MessageEmbed } = require('discord.js'), 
    { ifNotSupportRole } = require('../Utils/Functions'),
    { checkIfAtt } = require('../Utils/Functions'),
    { newTicket } = require('../database/admin');

module.exports = async function (interaction) {

    const guild = interaction.guild;
    const user = interaction.user;
    const Apelaciones = guild.channels.cache.find(c => c.name == TConfig.categories.TicketsApel.name && c.type === 'GUILD_CATEGORY');

    interaction.message.delete();

    const staffRole = guild.roles.cache.find(r => r.name === config.rolesInfo.Staff);

    if (!staffRole) ifNotSupportRole({
        guild: guild
    });

    const channel = interaction.channel;

    channel.setParent(Apelaciones);
    channel.setTopic(`ID: ${user.id}`);
    channel.setName(`apelación-${interaction.user.tag}`);
    
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
            .setDescription(_ticketsQuestions.TicketsApel.primera);
        channel.send({
            embeds: [pregunta1]
        });
        channel.awaitMessages({
            filter: m => m.author.id === user.id && !m.author.bot,
            max: 1
        }).then(async mensaje => {
            var respuesta = await checkIfAtt({ message: mensaje });

            let pregunta2 = new MessageEmbed()
                .setColor('#0099ff')
                .setDescription(_ticketsQuestions.TicketsApel.segunda);
            channel.send({
                embeds: [pregunta2]
            });
            channel.awaitMessages({
                filter: m => m.author.id === user.id && !m.author.bot,
                max: 1
            }).then(async mensaje2 => {
                var respuesta2 = await checkIfAtt({ message: mensaje2 });

                let pregunta3 = new MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription(_ticketsQuestions.TicketsApel.tercera);
                channel.send({
                    embeds: [pregunta3]
                });
                channel.awaitMessages({
                    filter: m => m.author.id === user.id && !m.author.bot,
                    max: 1
                }).then(async mensaje3 => {

                    var respuesta3 = await checkIfAtt({ message: mensaje3 });

                    let pregunta4 = new MessageEmbed()
                        .setColor('#0099ff')
                        .setDescription(_ticketsQuestions.TicketsApel.cuarta);
                    channel.send({
                        embeds: [pregunta4]
                    });
                    channel.awaitMessages({
                        filter: m => m.author.id === user.id && !m.author.bot,
                        max: 1
                    }).then(async mensaje4 => {

                        var respuesta4 = await checkIfAtt({ message: mensaje4 });

                        let pregunta5 = new MessageEmbed()
                            .setColor('#0099ff')
                            .setDescription(_ticketsQuestions.TicketsApel.quinta);
                        channel.send({
                            embeds: [pregunta5]
                        });
                        channel.awaitMessages({
                            filter: m => m.author.id === user.id && !m.author.bot,
                            max: 1
                        }).then(async mensaje5 => {

                            var respuesta5 = await checkIfAtt({ message: mensaje5 });

                            channel.bulkDelete(15);
                            var finalEmbed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle(`Ticket de Apelaciones.`)
                                .setAuthor(`${guild.name}`, guild.iconURL())
                                .setDescription(`**${_ticketsQuestions.TicketsApel.primera}**\n- ${respuesta}\n**${_ticketsQuestions.TicketsApel.segunda}**\n- ${respuesta2}\n**${_ticketsQuestions.TicketsApel.tercera}**\n- ${respuesta3}\n**${_ticketsQuestions.TicketsApel.cuarta}**\n- ${respuesta4}\n**${_ticketsQuestions.TicketsApel.quinta}**\n- ${respuesta5}`)
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