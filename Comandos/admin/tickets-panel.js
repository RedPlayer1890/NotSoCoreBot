const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'ticketpanel',
    aliases: ['tickets', 'panel'],
    type: 'TEXT',
    slashCommandOptions: [],
    description: 'Crea un panel para tickets',
    category: 'admin',
    usage: 'ticketpanel',
    userPerms: ["ADMINISTRATOR"],
    run: async function(client, message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("¡No tienes permisos de hacer esto!\nEste comando solo puede ser ejecutado por gente con el permiso \"ADMINISTRATOR\"");

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Panel de tickets')
            .setDescription("**-** _**¡En caso de que necesites soporte, haz click en el botón de abajo!**_")
            .addField("_ _", "_ _")
            .addField("Importante", "**·** No debes abrir un ticket sin razón alguna. Pues el soporte es específicamente para problemas los cuales los usuarios no pueden resolver sin ayuda.\n\n**·** No hables apenas se abra el ticket. Primero responde las preguntas, que te hará el bot.")
            .setTimestamp();

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('PRIMARY')
                    .setLabel("┃ ¡Crear un ticket!")
                    .setEmoji('🎟')
                    .setCustomId('ticketPanel')
            );

        message.channel.send({ embeds: [embed], components: [row]});
    }
}