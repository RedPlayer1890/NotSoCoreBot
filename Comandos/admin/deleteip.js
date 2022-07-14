module.exports = {
    name: 'deleteip',
    aliases: ['removeip'],
    type: 'BOTH',
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
    },
    slash: async function (interaction, args, client) {
        if (!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.reply("No tienes permisos para ejecutar este comando.");

        const { deleteIP } = require('../../database/admin.js');

        interaction.reply(`La ip de la guild ${interaction.guild.name} ha sido eliminada correctamente.`);
        await deleteIP(interaction.guild.id);
    }
}