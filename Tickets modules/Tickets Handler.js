const 
    { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js'),
    { ifNotSupportRole, ifNotOwnerRole } = require('../Utils/Functions'), 
    _emojis = require('../Config/emojis'), 
    TConfig = require('../Config/Tickets-Config.js'), 
    config = require('../Config/config.json'), 
    { newTicket } = require('../database/admin');

module.exports = async function (interaction, client) {
    const guild = interaction.guild;
    const user = interaction.user;

    const staffRole = guild.roles.cache.find(r => r.name == config.rolesInfo.Staff);

    if (!staffRole) ifNotSupportRole({
        guild: guild
    });

    const ownerRole = guild.roles.cache.find(r => r.name == config.rolesInfo.Owner);

    if (!ownerRole) ifNotOwnerRole({
        guild: guild
    });

    if (interaction.isButton()) {
        let value = interaction.customId;

        if (value === 'ticketPanel') {
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('¡Selecciona tu categoría!')
                .setDescription('Selecciona una categoría a abrir ticket en la sección de abajo.\n\n**¡Ten cuidado, una vez abierto el ticket, no podrás cambiar la categoría!**')
                .addField("_ _", "_ _")
                .addField("Categorías", "**·** Ayuda General\n**·** Reportes\n**·** Reportes Staff\n**·** Reportes Bugs\n**·** Rangos/Compras")

            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('ticketCategory')
                    .setPlaceholder('Categorías')
                    .addOptions([{
                            label: 'Ayuda General',
                            value: 'TicketsAG',
                            emoji: _emojis.ayudaGeneral
                        },
                        {
                            label: 'Apelaciones',
                            value: 'TicketsApel',
                            emoji: _emojis.apelaciones
                        },
                        {
                            label: 'Reportes',
                            value: 'TicketsRep',
                            emoji: _emojis.reportes
                        },
                        {
                            label: 'Reportes Staff',
                            value: 'TicketsRepStaff',
                            emoji: _emojis.reportesStaff
                        },
                        {
                            label: 'Reportes Bugs',
                            value: 'TicketsRepBugs',
                            emoji: _emojis.bugs
                        },
                        {
                            label: 'Rangos/Compras',
                            value: 'TicketsRanCom',
                            emoji: _emojis.rangosCompras
                        },
                        {
                            label: 'Cuentas',
                            value: 'TicketsCuentas',
                            emoji: _emojis.cuentas
                        },
                        {
                            label: 'Cerrar',
                            value: 'TicketsCerrar',
                            emoji: _emojis.close
                        }
                    ])
                );

            interaction.guild.channels.create(`ticket-${user.tag}`, {
                type: 'GUILD_TEXT',
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: user.id,
                        allow: ['VIEW_CHANNEL']
                    },
                    {
                        id: staffRole.id,
                        allow: ['VIEW_CHANNEL']
                    }
                ],
                parent: interaction.guild.channels.cache.find(c => c.name === TConfig.categories.Tickets.name).id
            }).then(async thread => {
                const miembro = interaction.member;

                await thread.send({
                    content: `¡Hola, ${miembro}!`,
                    embeds: [embed],
                    components: [row]
                });

                newTicket(thread.id, true, interaction.user.id);

                interaction.reply({
                    content: `¡Ticket abierto! Ve a él haciendo click acá: ${thread}`,
                    ephemeral: true
                });
            });
        }
    } // =============================================================== //

    const Apelaciones = require("./apelaciones"),
        Reportes = require("./reportes"),
        ReportesStaff = require("./reportesStaff"),
        ReportesBugs = require("./bugs"),
        RangosCompras = require("./compras"),
        ayudaGeneral = require("./ayudaGeneral"),
        Cuentas = require("./cuentas");

    if (interaction.isSelectMenu()) {

        let value = interaction.values[0];

        if (value === "TicketsAG") {
            await ayudaGeneral(interaction);
        }

        if (value === "TicketsRep") {
            await Reportes(interaction);
        }

        if (value === "TicketsRepBugs") {
            await ReportesBugs(interaction);
        }

        if (value === "TicketsRepStaff") {
            await ReportesStaff(interaction);
        }

        if (value === "TicketsApel") {
            await Apelaciones(interaction);
        }

        if (value === "TicketsCuentas") {
            await Cuentas(interaction);
        }

        if (value === "TicketsRanCom") {
            await RangosCompras(interaction);
        }

    } // ==================================================================================== //
}