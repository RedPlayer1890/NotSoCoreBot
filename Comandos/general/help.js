const {
    MessageActionRow,
    MessageSelectMenu,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Ve una lista de comandos disponibles',
    type: 'BOTH',
    aliases: ["ayuda"],
    slashCommandOptions: [{
        name: "command",
        type: "STRING",
        description: "El comando que se quiere ver la ayuda de.",
        required: false
    }],
    usage: '',
    category: 'general',
    run: async function (cliente, message, args) {

        const client = require("../../index");

        let actionRow = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId('h-categories')
                .setPlaceholder('Selecciona una categoría')
                .addOptions([{
                        label: 'General',
                        value: 'h-general',
                        emoji: '📝'
                    },
                    {
                        label: 'Moderación',
                        value: 'h-moderation',
                        emoji: '📝'
                    },
                    {
                        label: 'Admin',
                        value: 'h-admin',
                        emoji: '📝'
                    }
                ])
            )

        let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Menú de ayuda.')
            .setDescription(`¡Hola! Para ver una lista de comandos separada por la categoría de estos, puedes seleccionar una categoría en el menú de abajo.\nPara obtener ayuda de cada comando en específico, usa !help <comando>.\n\n**Sobre mi**\n  **-** Servidores en los que estoy activo: ${client.guilds.cache.size}\n  **-** Usuarios a los que vigilo: ${client.users.cache.size}\n  **-** Comandos disponibles: ${client.commands.size}\n  **-** Servidor de soporte: **[aquí](https://discord.gg/x7pP9YytDt)**`)
            .setFooter(message.guild.name)
            .setTimestamp();

        message.channel.send({
            embeds: [embed],
            components: [actionRow]
        });
    },
    slash: async function (interaction, args, client) {
        if (interaction.options.get('command').value) {
            const comando = client.commands.find(c => c.name.toLowerCase() == interaction.options.get('command').value.toLowerCase());
            if (!comando) return interaction.message.reply("No se encontró el comando especificado.");

            let embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Ayuda para el comando ${comando.name}`)
                .setDescription(`**Descripción:** ${comando.description}\n**Uso:** ${comando.usage}\n**Categoría:** ${comando.category}`)
                .setFooter(interaction.message.guild.name)
                .setTimestamp();

            return interaction.reply({
                embeds: [embed]
            });
        }

        let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Menú de ayuda.')
            .setDescription(`¡Hola! Para ver una lista de comandos separada por la categoría de estos, puedes seleccionar una categoría en el menú de abajo.\nPara obtener ayuda de cada comando en específico, usa !help <comando>.\n\n**Sobre mi**\n  **-** Servidores en los que estoy activo: ${client.guilds.cache.size}\n  **-** Usuarios a los que vigilo: ${client.users.cache.size}\n  **-** Comandos disponibles: ${client.commands.size}\n  **-** Servidor de soporte: **[aquí](https://discord.gg/x7pP9YytDt)**`)
            .setFooter(interaction.message.guild.name)
            .setTimestamp();

        let actionRow = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId('h-categories')
                .setPlaceholder('Selecciona una categoría')
                .addOptions([
                    { label: 'General', value: 'h-general', emoji: '📝' },
                    { label: 'Moderación', value: 'h-moderation', emoji: '📝' },
                    { label: 'Admin', value: 'h-admin', emoji: '📝' }
                ])
            )

        interaction.reply({
            embeds: [embed],
            components: [actionRow]
        });
    }
}