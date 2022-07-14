const { MessageEmbed } = require('discord.js');
const { setIP } = require('../../database/admin.js');

module.exports = {
    name: 'setip',
    aliases: [],
    type: 'BOTH',
    category: 'admin',
    slashCommandOptions: [
        {
            name: "ip",
            type: "STRING",
            description: "La ip que se quiere cambiar.",
            required: true
        }
    ],
    description: 'Establece la IP de el servidor de minecraft que maneja la guild de discord actual.',
    permisos: ["MANAGE_GUILD"],
    run: async function (client, message, args) {
        if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply("No tienes permisos para ejecutar este comando.");
        if (!args[0]) return message.reply("Debes especificar una IP.");

        let iptoSet = args[0];

        setIP(message.guild.id, iptoSet);
        let embed = new MessageEmbed()
            .setDescription(`✅ ¡La ip de **${message.guild.name}**, ha sido establecida correctamente!`)
            .setColor("GREEN");

        return message.reply({ embeds: [embed] });
    },
    slash: async function (interaction, args, client) {
        const ip = interaction.options.get("ip").value;

        if (!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.reply("No tienes permisos para ejecutar este comando.");

        setIP(interaction.guild.id, ip);
        let embed = new MessageEmbed()
            .setDescription(`✅ ¡La ip de **${interaction.guild.name}**, ha sido establecida correctamente!`)
            .setColor("GREEN");

        return interaction.reply({ embeds: [embed] });
    }
}