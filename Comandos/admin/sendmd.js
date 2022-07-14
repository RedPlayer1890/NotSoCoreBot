const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'sendmd',
    aliases: [],
    description: 'Envía un mensaje al md de un usuario.',
    usage: 'sendmd <@user> <mensaje>',
    type: 'BOTH',
    category: 'admin',
    slashCommandOptions: [
        {
            name: "user",
            type: "USER",
            description: "El usuario al que se enviará el mensaje.",
            required: true
        },
        {
            name: "mensaje",
            type: "STRING",
            description: "El mensaje que se enviará.",
            required: true
        }
    ],
    userPerms: ["ADMINISTRATOR"],
    run: async function (client, message, args) {
        const user = message.mentions.users.first() || message.guild.members.cache.find(m => m.id === args[0]);

        if (!user) return message.reply("¡Debes especificar un usuario!");
        if (!args[1]) return message.reply("¡Debes escribir un mensaje!");

        let embed = new MessageEmbed()
            .setColor('DARK_BUT_NOT_BLACK')
            .setDescription(args.slice(1).join(" "))

        try {
            await user.send({
                embeds: [embed]
            });
            message.reply(`Mensaje enviado a ${user.tag}`);
        } catch (err) {
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle("Error")
                    .setDescription(`No se pudo enviar el mensaje a ${user.tag}`)
                    .setTimestamp()
                ],
                ephemeral: true
            });
        }
    },
    slash: async function (interaction, args, client) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("No tienes permisos para ejecutar este comando.");
        
        const user = interaction.options.get("user").value;
        const mensaje = interaction.options.get("mensaje").value;

        try {
            user.send({
                content: mensaje
            });
        }
        catch (err) {
            interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle("Error")
                    .setDescription(`No se pudo enviar el mensaje a ${user.tag}`)
                    .setTimestamp()
                ],
                ephemeral: true
            });
        }
    }
}