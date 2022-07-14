const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'say',
    aliases: [],
    description: 'Escribe un mensaje en el canal.',
    usage: 'say <#canal> <mensaje>',
    type: 'TEXT',
    category: 'admin',
    userPerms: ["ADMINISTRATOR"],
    run: async function (client, message, args) {

        const canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!canal) return message.reply("No se pudo encontrar el canal.");

        const mensaje = args.slice(1).join(" ");

        let embed = new MessageEmbed()
            .setColor('DARK_BUT_NOT_BLACK')
            .setDescription(mensaje)
            .setTimestamp();

        return canal.send({
            embeds: [embed]
        });
    }
}