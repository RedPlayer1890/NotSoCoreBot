const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'setip',
    aliases: [],
    type: 'TEXT',
    category: 'admin',
    slashCommandOptons: [],
    description: 'Establece la IP de el servidor de minecraft que maneja la guild de discord actual.',
    permisos: ["MANAGE_GUILD"],
    run: async function (client, message, args) {
        if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply("No tienes permisos para ejecutar este comando.");
        if (!args[0]) return message.reply("Debes especificar una IP.");

        const { setIP } = require('../../database/admin.js');

        let iptoSet = args[0];

        setIP(message.guild.id, iptoSet);
        let embed = new MessageEmbed()
            .setDescription(`✅ ¡La ip de **${message.guild.name}**, ha sido establecida correctamente!`)
            .setColor("GREEN");

        return message.reply({ embeds: [embed] });
    }
}