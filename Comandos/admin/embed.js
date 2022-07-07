const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'embed',
    aliases: [],
    type: 'BOTH',
    slashCommandOptions: [
        {
            name: "canal",
            type: "CHANNEL",
            description: "El canal donde se enviará el mensaje.",
            required: true
        },
        {
            name: "descripcion",
            type: "STRING",
            description: "La descripción del mensaje.",
            required: true
        },
        {
            name: "color",
            type: "STRING",
            description: "El color del mensaje.",
            required: true
        },
        {
            name: "titulo",
            type: "STRING",
            description: "El título del mensaje.",
            required: true
        },
        
    ],
    description: 'Crea un embed.',
    usage: 'embed <canal> <descripcion>',
    category: 'admin',
    userPerms: ["ADMINISTRATOR"],
    run: async function (client, message, args) {

        let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!args[0]) return message.reply("¡Debes especificar el ID de el canal!");
        if (!args.slice(1).join(" ")) return message.reply("Debes escribir un mensaje.");

        let texto = args.slice(1).join(" ");

        return canal.send({
            embeds: [new MessageEmbed().setColor("#2C2F33").setDescription(texto)]
        });


        // ==============================================================================================
    },
    slash: async function (interaction, args, client) {
        
        if (interaction.options.get("canal").value) {
            let canal = interaction.guild.channels.cache.get(interaction.options.get("canal").value);
            let embed = new MessageEmbed()
                .setColor(interaction.options.get("color").value)
                .setTitle(interaction.options.get("titulo").value)
                .setDescription(interaction.options.get("descripcion").value);

            canal.send({
                embeds: [embed]
            });
        }
    }
}