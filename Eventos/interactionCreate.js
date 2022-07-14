const {
    MessageEmbed
} = require("discord.js");
const TicketHandler = require("../Tickets modules/Tickets Handler.js");

module.exports = async function (interaction) {
    const client = require("../index");

    let args = [interaction.commandName];

    if (interaction.isCommand()) {
        const command = client.commands.find(command => command.name.toLowerCase() == interaction.commandName.toLowerCase());

        let array2 = [];

        if (!command) return interaction.reply("El comando no está en la lista de comandos de el bot.");

        if (command.slashCommandOptions > 0) {
            command.slashCommandOptions.forEach(option => array2.push(`${interaction.options.get(option.name) ? interaction.options.get(option.name).value ? interaction.options.get(option.name).value : "nodef1" : "nodef2"}`));
        }

        if (array2.length > 0) {
            array2.forEach(e => {
                if (e !== "nodef1" || e !== "nodef2") {
                    args.push(...command.slashCommandOptions.map(v => `${interaction.options.get(v.name).value}`));
                }
            });
        }        

        if (command.userPerms && !interaction.member.permissions.has(command.userPerms))
            return interaction.reply("`❌` No tienes permiso de usar esto.");

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

            return interaction.reply({
                embeds: [embed]
            });
        }

        if (value == "h-moderation") {
            const comandosModeracion = client.commands.filter(c => c.category == "moderation");

            const embed = new MessageEmbed()
                .setColor("#00ffff")
                .setTitle("Comandos de Moderación")
                .setDescription(`${comandosModeracion.map(c => `\`${c.name}\` - ${c.usage ? c.usage : 'Sin uso definido'}`).join("\n")}`)
                .setFooter(`${comandosModeracion.size} comandos en total.`)
                .setTimestamp();

            return interaction.reply({
                embeds: [embed]
            });
        }

        if (value == "h-admin") {
            const comandosAdministración = client.commands.filter(c => c.category == "admin");

            const embed = new MessageEmbed()
                .setColor("#00ffff")
                .setTitle("Comandos de Administración")
                .setDescription(`${comandosAdministración.map(c => `\`${c.name}\` - ${c.usage ? c.usage : 'Sin uso definido'}`).join("\n")}`)
                .setFooter(`${comandosAdministración.size} comandos en total.`)
                .setTimestamp();

            return interaction.reply({
                embeds: [embed]
            });
        }
    }

    await TicketHandler(interaction, client);
}