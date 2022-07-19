const config = require("../../Config/config.json");

module.exports = {
    name: 'editGA',
    description: '🎉 Edit a giveaway',
    category: 'giveaways',
    usage: 'edit <giveaway id> <new prize>',
    userPerms: ['MANAGE_MESSAGES'],
    type: 'SLASH',
    slashCommandOptions: [
        {
            name: 'sorteo',
            description: 'La ID de el mensaje sorteo que quieres editar.',
            type: 'STRING',
            required: true
        },
        {
            name: 'duración',
            description: 'Duración de el sorteo; ejemplo: 1d, 1h, 1m, 1s',
            type: 'STRING',
            required: true
        },
        {
            name: 'ganadores',
            description: 'Cantidad de ganadores que tendrá el sorteo.',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'premio',
            description: 'El premio de el sorteo.',
            type: 'STRING',
            required: true
        }
    ],
    slash: async (interaction, args, client) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === config.rolesInfo.giveawaysAdmin)) {
            return interaction.reply({
                content: ':x: No tienes el permiso de editar sorteos.',
                ephemeral: true
            });
        }
        const gid = interaction.options.getString('sorteo');
        const time = interaction.options.getString('duración');
        const winnersCount = interaction.options.getInteger('ganadores');
        const prize = interaction.options.getString('premio');
        
        await interaction.deferReply({
         ephemeral: true
        });

        try {
            await client.giveawaysManager.edit(gid, {
                newWinnersCount: winnersCount,
                newPrize: prize,
                addTime: time
            });
        } catch(e) {
            return interaction.editReply({
                content: `No se ha encontrado el sorteo con la id de mensaje \`${gid}\``,
                ephemeral: true
            });
        }
        return interaction.editReply({
            content: `¡Sorteo editado!`,
            ephemeral: true
        });
    }

};
