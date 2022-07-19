const util = require('minecraft-server-util');
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'realmcstatus',
    aliases: [],
    type: 'TEXT',
    category: 'admin',
    usage: 'realmcstatus <ip>',
    slashCommandOptons: [],
    description: 'Obtén la dirección IP y estado de el servidor.',
    permisos: ["SEND_MESSAGES"],
    run: async function (client, message, args) {
        const ip = args[0] || 'hypixel.net';
        var int = 1;

        util.status(ip).then(async (res, err) => {
            message.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle("Estado del servidor")
                    .setDescription(`Estado del servidor ${message.guild.name}\n**IP:** ${ip}\n**Version base:** ${res.version.name}\n**Jugadores en linea:** ${res.players.online} / ${res.players.max}\n**Veces actualizado:** ${int}`)
                    .setImage(`http://status.mclive.eu/${message.guild.name.split(" ").join("_")}/${ip}/25565/banner.png`)
                ]
            }).then((msg) => {
                setTimeout(async () => {
                    setInterval(async () => {
                        util.status(ip).then((res, err) => {
                            int += 1;
        
                            const status = new MessageEmbed()
                                .setTitle("Estado del servidor")
                                .setDescription(`Estado del servidor ${message.guild.name}\n**IP:** ${ip}\n**Version base:** ${res.version.name}\n**Jugadores en linea:** ${res.players.online} / ${res.players.max}\n**Veces actualizado:** ${int}`)
                                .setImage(`http://status.mclive.eu/${message.guild.name.split(" ").join("_")}/${ip}/25565/banner.png`);
        
                            msg.edit({
                                embeds: [status]
                            }).catch(err => {
                                console.log(err)
                            });
                        });
                    }, 10000);
                }, 2000);
            });
        });
    }
}