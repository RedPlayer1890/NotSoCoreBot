const config = require("../../Config/config.json");

module.exports = {
    name: "endGA",
    description: 'Termina un sorteo',
    category: 'giveaways',
    usage: 'end <giveaway id>',
    userPerms: ['MANAGE_MESSAGES'],
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'sorteo',
            description: 'El sorteo que quieres terminar (ID de mensaje o premio de el sorteo).',
            type: 'STRING',
            required: true
        }
    ],
    slash: async (interaction, args, client) => {

        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === config.rolesInfo.giveawaysAdmin)) {
            return interaction.reply({
                content: ':x: No tienes el permiso de terminar sorteos.',
                ephemeral: true
            });
        }

        const query = interaction.options.getString('sorteo');

        const giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
        if (!giveaway) {
            return interaction.reply({
                content: 'No se encontró un sorteo con el contenido especificado.',
                ephemeral: true
            });
        }

        if (giveaway.ended) {
            return interaction.reply({
                content: 'Ese sorteo ya terminó.',
                ephemeral: true
            });
        }

        client.giveawaysManager.end(giveaway.messageId)
            .then(() => {
                interaction.reply(`**[Este sorteo](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** fue terminado correctamente.`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};