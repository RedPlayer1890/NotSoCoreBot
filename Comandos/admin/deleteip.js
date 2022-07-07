module.exports = {
    name: 'deleteip',
    aliases: ['removeip'],
    type: 'TEXT',
    slashCommandOptons: [],
    description: 'Remover la ip de la guild',
    usage: 'deleteip',
    category: 'admin',
    userPerms: ["MANAGE_GUILD"],
    run: async function (client, message, args) {
        if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply("No tienes permisos para ejecutar este comando.");

        const { deleteIP } = require('../../database/admin.js');

        message.reply(`La ip de la guild ${message.guild.name} ha sido eliminada correctamente.`);
        await deleteIP(message.guild.id);
    }
}