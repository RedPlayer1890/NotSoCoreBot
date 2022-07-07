const { MessageEmbed } = require("discord.js");
const TicketHandler = require("../Tickets modules/Tickets Handler.js");

module.exports = async function (interaction) {
    const client = require("../index");

    let args = [ interaction.commandName ];

    if (interaction.isCommand()) {
        let commandExecuted = client.commands.find(command => command.name === interaction.commandName);

        let array2 = [];

        if (commandExecuted && commandExecuted !== undefined) {
            commandExecuted.slashCommandOptions.forEach(option => array2.push(`${interaction.options.get(option.name) ? interaction.options.get(option.name).value ? interaction.options.get(option.name).value : "undefined1" : "undefined2"}`));

            if (!array2 == "undefined1" || !array2 == "undefined2") {
                args.push(...commandExecuted.slashCommandOptions.map(v => `${interaction.options.get(v.name).value}`));
            }
        }

        const command = client.commands.find(cmd => cmd.name.toLowerCase() == interaction.commandName);

        if (!command) return interaction.reply("<:cross2:936368925481009172> Ese no es un comando valido o habilitado.");

        if (command.userPerms && !interaction.member.permissions.has(command.userPerms))
            return interaction.reply("<:cross2:936368925481009172> No tienes permiso de usar esto.");

        command.slash(interaction, args, client);
    }

    if (interaction.isSelectMenu()) {
        const value = interaction.values[0];

        if (value == "h-general") {
            const comandosGenerales = client.commands.filter(c => c.category == "general");

            const embed = new MessageEmbed()
                .setColor("#00ffff")
                .setTitle("Comandos Generales")
                .setDescription(`${comandosGenerales.map(c => `\`${c.name}\` - ${c.usage ? c.usage : 'Sin uso definido'}`).join("\n")}`)
                .setFooter(`${comandosGenerales.size} comandos en total.`)
                .setTimestamp();

            return interaction.reply({ embeds: [embed] });
        }

        if (value == "h-moderation") {
            const comandosModeracion = client.commands.filter(c => c.category == "moderation");

            const embed = new MessageEmbed()
                .setColor("#00ffff")
                .setTitle("Comandos de Moderación")
                .setDescription(`${comandosModeracion.map(c => `\`${c.name}\` - ${c.usage ? c.usage : 'Sin uso definido'}`).join("\n")}`)
                .setFooter(`${comandosModeracion.size} comandos en total.`)
                .setTimestamp();

            return interaction.reply({ embeds: [embed] });
        }

        if (value == "h-admin") {
            const comandosAdministración = client.commands.filter(c => c.category == "admin");

            const embed = new MessageEmbed()
                .setColor("#00ffff")
                .setTitle("Comandos de Administración")
                .setDescription(`${comandosAdministración.map(c => `\`${c.name}\` - ${c.usage ? c.usage : 'Sin uso definido'}`).join("\n")}`)
                .setFooter(`${comandosAdministración.size} comandos en total.`)
                .setTimestamp();

            return interaction.reply({ embeds: [embed] });
        }
    }

    await TicketHandler(interaction, client);
}