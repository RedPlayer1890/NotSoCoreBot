const { MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');

module.exports = {
    name: 'ip',
    aliases: ['serverip'],
    type: 'BOTH',
    category: 'general',
    slashCommandOptons: [],
    description: 'Obtén la dirección IP y estado de el servidor.',
    permisos: ["SEND_MESSAGES"],
    run: async function (client, message, args) {
        const { getIP } = require('../../database/admin.js');
        const { IP } = await getIP(message.guild.id);

        if (!IP) {
            let embed = new MessageEmbed()
                .setTitle("¡Todavía no me han configurado!")
                .setDescription("Para configurarme, utiliza el comando `!setip <ip>`")
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter(`${message.guild.name}`);

            message.reply({
                embeds: [embed]
            });
        }

        if (IP !== undefined || IP !== null) {
            util.status(IP)
                .then((res, err) => {
                    if (err) {
                        message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setTitle("Ups...")
                                .setDescription("No se pudo obtener el estado del servidor...\n¿Puede que esté fuera de línea?")
                                .setColor('RANDOM')
                            ]
                        })
                    }
                    let motd = `http://status.mclive.eu/MinecraftServer/${IP}/25565/banner.png`
                    const embed = new MessageEmbed()
                        .setTitle(`Informacion sobre ${message.guild.name}`)
                        .addField('IP:', IP)
                        .addField('Version base: ', `${res.version.name}`)
                        .addField('Jugadores en linea:', `${res.players.online} / ${res.players.max}`)
                        .setFooter(`${message.guild.name}`)
                        .setImage(motd)
                        .setTimestamp()
                        .setColor('RANDOM')

                    return message.channel.send({
                        embeds: [embed]
                    });
                });
        }
    },
    slash: async function (interaction, args, client) {
        const { getIP } = require('../../database/admin.js');
        const { IP } = await getIP(interaction.guild.id);

        if (!IP) {
            let embed = new MessageEmbed()
                .setTitle("¡Todavía no me han configurado!")
                .setDescription("Para configurarme, utiliza el comando `!setip <ip>`")
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter(`${interaction.guild.name}`);

            interaction.reply({
                embeds: [embed]
            });
        }

        if (IP !== undefined || IP !== null) {
            util.status(IP)
                .then((res, err) => {

                    if (err) {
                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setTitle("Ups...")
                                .setDescription("No se pudo obtener el estado del servidor...\n¿Puede que esté fuera de línea?")
                                .setColor('RANDOM')
                            ]
                        })
                    }

                    let motd = `http://status.mclive.eu/MinecraftServer/${IP}/25565/banner.png`
                    const embed = new MessageEmbed()
                        .setTitle(`Informacion sobre ${interaction.guild.name}`)
                        .addField('IP:', IP)
                        .addField('Version base: ', `${res.version.name}`)
                        .addField('Jugadores en linea:', `${res.players.online} / ${res.players.max}`)
                        .setFooter(`${interaction.guild.name}`)
                        .setImage(motd)
                        .setTimestamp()
                        .setColor('RANDOM')

                    return interaction.reply({
                        embeds: [embed]
                    });
                });
        }
    }
}