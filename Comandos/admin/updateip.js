const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'updateip',
    aliases: [],
    type: 'TEXT',
    slashCommandOptons: [],
    description: 'Actualiza la variable de la IP de el servidor de minecraft que maneja la guild de discord actual.',
    usage: 'updateip <ip>',
    category: 'admin',
    userPerms: ["MANAGE_GUILD"],
    run: async function (client, message, args) {
        if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply("No tienes permisos para ejecutar este comando.");
        if (!args[0]) return message.reply("Debes especificar una IP.");

        const { updateIP, hasIP, setIP } = require('../../database/admin.js');

        if (hasIP(message.guild.id)) {
            updateIP(message.guild.id, args[0]);

            return message.reply({ embeds: [new MessageEmbed().setDescription(`✅ ¡La ip de **${message.guild.name}**, ha sido actualizada correctamente!`).setColor("GREEN")]});
        }

        let iptoSet = args[0];

        setIP(message.guild.id, iptoSet);
        let embed = new MessageEmbed()
            .setDescription(`✅ ¡La ip de **${message.guild.name}**, ha sido establecida correctamente!`)
            .setColor("GREEN")
            .setTimestamp();

        return message.reply({ embeds: [embed] });
    }
}