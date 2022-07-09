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

        let embed = new MessageEmbed()
            .setColor('DARK_BUT_NOT_BLACK')
            .setDescription(args.slice(1).join(" "))
            .setTimestamp();

        if (message.mentions.channels.first()) {
            let canal = message.mentions.channels.first();
            if (!args.slice(1).join(" ")) return message.reply("Debes escribir un mensaje.");

            return canal.send({
                embeds: [embed]
            });
        }

        if (!args[0]) return message.reply("¡Debes especificar el ID de el canal!");
        if (!args.slice(1).join(" ")) return message.reply("Debes escribir un mensaje.");

        let canal2 = message.guild.channels.cache.get(args[0]);

        return canal2.send({
            embeds: [embed]
        });
    }
}