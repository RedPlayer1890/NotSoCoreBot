const { existsPrefix, updatePrefix, addPrefix } = require('../../database/admin');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'setprefix',
    aliases: [],
    type: 'BOTH',
    slashCommandOptions: [
        {
            name: "prefix",
            description: "El prefijo que quieres usar.",
            type: "STRING",
            required: true
        }
    ],
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
    },
    slash: async function (interaction, args, client) {
        const prefix = interaction.options.get("prefix").value;

        if (!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.reply("No tienes permisos para ejecutar este comando.");

        let boolEx = await existsPrefix(interaction.guild.id);

        if (boolEx) {
            await updatePrefix(interaction.guild.id, prefix);
            let embed = new MessageEmbed()
                .setDescription(`✅ ¡El prefix de **${interaction.guild.name}**, ha sido establecido correctamente!`)
                .setColor("GREEN");

            return interaction.reply({ embeds: [embed] });
        }

        await addPrefix(interaction.guild.id, prefix);
        let embed = new MessageEmbed()
            .setDescription(`✅ ¡El prefix de **${interaction.guild.name}**, ha sido establecido correctamente!`)
            .setColor("GREEN");

        return interaction.reply({ embeds: [embed] });
    }
}