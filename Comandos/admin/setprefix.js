const { existsPrefix, updatePrefix, addPrefix } = require('../../database/admin');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'setprefix',
    aliases: [],
    type: 'TEXT',
    slashCommandOptions: [],
    description: 'Establece el prefix de el servidor',
    usage: 'setprefix <prefix>',
    category: 'admin',
    userPerms: ["ADMINISTRATOR"],
    run: async function (client, message, args) {
        if (!message.guild) return;
        if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply("No tienes permisos para ejecutar este comando");

        if (!args[0]) return message.reply({ content: "¡Necesitas especificar un prefix!" });

        let exists = await existsPrefix(message.guild.id);

        if (exists) {
            await updatePrefix(message.guild.id, args[0]);
            return message.reply({ content: "¡Prefijo actualizado!" });
        }

        await addPrefix(message.guild.id, args[0]);
        return message.reply({ content: "¡Prefijo establecido!" });
    }
}