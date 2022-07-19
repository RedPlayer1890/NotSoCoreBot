const config = require("../../Config/config.json");

module.exports = {
    name: "resumeGA",
    description: 'Reanuda un sorteo',
    category: 'giveaways',
    usage: 'resume <giveaway id>',
    userPerms: ['MANAGE_MESSAGES'],
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'sorteo',
            description: 'El sorteo que quieres reanudar (ID de mensaje o premio de el sorteo).',
            type: 'STRING',
            required: true
        }
    ],

    slash: async (interaction, args, client) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name ===config.rolesInfo.giveawaysAdmin)) {
            return interaction.reply({
                content: ':x: No tienes el permiso requerido para reanudar sorteos.',
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

        if (!giveaway.pauseOptions.isPaused) {
            return interaction.reply({
                content: `**[Este sorteo](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** no está detenido.`,
                ephemeral: true
            });
        }

        client.giveawaysManager.unpause(giveaway.messageId)
            .then(() => {
                // Success message
                interaction.reply(`**[Este sorteo](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** se ha resumido con éxito.`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};