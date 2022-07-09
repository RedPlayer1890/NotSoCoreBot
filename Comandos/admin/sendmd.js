const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'sendmd',
    aliases: [],
    description: 'Envía un mensaje al md de un usuario.',
    usage: 'sendmd <@user> <mensaje>',
    type: 'TEXT',
    category: 'admin',
    userPerms: ["ADMINISTRATOR"],
    run: async function (client, message, args) {
        const user = message.mentions.users.first() || message.guild.members.cache.find(m => m.id === args[0]);

        if (!user) return message.reply("¡Debes especificar un usuario!");
        if (!args[1]) return message.reply("¡Debes escribir un mensaje!");

        let embed = new MessageEmbed()
            .setColor('DARK_BUT_NOT_BLACK')
            .setDescription(args.slice(1).join(" "))

        try {
            await user.send({
                embeds: [embed]
            });
            message.reply(`Mensaje enviado a ${user.tag}`);
        } catch (err) {
            message.reply(`No se pudo enviar el mensaje a ${user.tag}\nSu md probablemente esté cerrado.`);
        }
    }
}