const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ping',
    description: '¡Pong!',
    aliases: [],
    type: 'BOTH',
    slashCommandOptions: [],
    usage: 'ping',
    category: 'general',
    run: async function (client, message, args) {
        let ping = Math.floor(client.ws.ping);
        let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ping')
            .setDescription(`:ping_pong: Conectando...`)
            .setTimestamp();

        message.channel.send({ embeds: [embed] }).then(msg => {
            let embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Ping')
                .setDescription(`:incoming_envelope: Mensajes: ${msg.createdTimestamp - message.createdTimestamp}ms\n:satellite_orbital: DiscordAPI: ${ping}ms`)
                .setFooter('Pong!')
                .setTimestamp();

            msg.edit({ embeds: [embed] });
        })
    },
    slash: async function (client, interaction, args) {
        let ping = Math.floor(client.ws.ping);
        let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ping')
            .setDescription(`:ping_pong: Conectando...`)
            .setTimestamp();

        interaction.reply({ embeds: [embed] }).then(msg => {
            let embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Ping')
                .setDescription(`:incoming_envelope: Mensajes: ${msg.createdTimestamp - interaction.createdTimestamp}ms\n:satellite_orbital: DiscordAPI: ${ping}ms`)
                .setFooter('Pong!')
                .setTimestamp();

            msg.edit({ embeds: [embed] });
        })
    }
}