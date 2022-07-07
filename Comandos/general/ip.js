const util = require("minecraft-server-util");
const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "ip",
    description: "Muestra la ip del servidor",
    aliases: [],
    usage: "ip",
    category: "general",
    run: async function (client, message, args) {
        const {
            getIP
        } = require('../../database/admin');
        const {
            IP
        } = await getIP(message.guild.id);

        if (!IP) {
            let embed = new MessageEmbed()
                .setTitle("¡Todavía no me han configurado!")
                .setDescription("Para configurarme, utiliza el comando `!setip <ip>`")
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter(`${message.guild.name}`);

            return message.reply({
                embeds: [embed]
            });
        }

        if (!IP === undefined || !IP === null) {
            util.status(IP)
                .then((res, err) => {
                    if (err) {
                        let embed = new MessageEmbed()
                            .setTitle("Ha ocurrido un error...")
                            .setDescription("Ha ocurrido un error intentando obtener la información de el servidor.\nUna posible causa, puede ser que no hayan establecido la ip. Si eres un administrador, usa !setip <ip> para establecerla.")
                            .setColor('RED')
                            .setTimestamp()
                            .setFooter(`${message.guild.name}`);

                        return message.reply({
                            embeds: [embed]
                        });
                    }

                    let motd = `http://status.mclive.eu/MinecraftServer/${IP}/25565/banner.png`
                    const embed = new MessageEmbed()
                        .setTitle(`Informacion sobre ${message.guild.name}`)
                        .addField('IP:', `${IP}`)
                        .addField('Version base: ', `${res.version.name}`)
                        .addField('Jugadores en linea:', `${res.players.online} / ${res.players.max}`)
                        .setFooter(`${message.guild.name}`)
                        .setImage(motd)
                        .setTimestamp()
                        .setColor('RANDOM')

                    return message.channel.send({
                        embeds: [embed]
                    });
                }).catch(err => {
                    let embed = new MessageEmbed()
                        .setTitle("Ha ocurrido un error...")
                        .setDescription("Ha ocurrido un error intentando obtener la información de el servidor.\nUna posible causa, puede ser que no hayan establecido la ip. Si eres un administrador, usa !setip <ip> para establecerla.")
                        .setColor('RED')
                        .setTimestamp()
                        .setFooter(`${message.guild.name}`);

                    message.channel.send({
                        embeds: [embed]
                    });

                    console.log(`[MC STATUS] Error intentando obtener el estado.\nError: ` + err);
                });
        }
    }
}