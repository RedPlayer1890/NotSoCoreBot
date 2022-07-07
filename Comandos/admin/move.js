const { isTicket } = require('../../database/admin');
const config = require('../../Config/config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'move',
    aliases: ['mover'],
    type: 'TEXT',
    slashCommandOptions: [],
    description: 'Mueve un ticket entre categorías',
    usage: 'move <categoría>',
    category: 'admin',
    userPerms: ["SEND_MESSAGES"],
    run: async function (client, message, args) {
        let check = await isTicket(message.channel.id);
        let categoría = args.slice(0).join(' ');
        let encontrarSoporte = message.guild.roles.cache.find(r => r.name == config.rolesInfo.Staff);
        if (encontrarSoporte) {
            if (check) {
                if (message.member.roles.cache.has(encontrarSoporte.id)) {
                    let catAMover = message.guild.channels.cache.find(c => c.name.toLowerCase() == categoría.toLowerCase() && c.type == "GUILD_CATEGORY");

                    let específicarMejor = new MessageEmbed()
                        .setColor("#00ff00")
                        .setDescription("**¡La categoría no se ha encontrado! Prueba escribir exactamente su nombre.**")
                        .setTimestamp();

                    if (!catAMover) return message.reply({
                        embeds: [específicarMejor]
                    }).then(m => setTimeout(() => m.delete(), 10000));
                    else {
                        message.channel.setParent(catAMover.id);
                        let movidaPapi = new MessageEmbed()
                            .setColor("#00ff00")
                            .setDescription("**¡El ticket se ha movido a la categoría " + catAMover.name + "!**")
                            .setTimestamp();
                        message.channel.send({
                            embeds: [movidaPapi]
                        })
                    }
                } else return message.reply("No tienes permisos para mover tickets.").then(m => setTimeout(() => m.delete(), 10000));
            } else return message.reply({ content: `No se ha encontrado este ticket en la base de datos... ¿Estás bien?` });
        } else return console.log("[😱] No se ha encontrado el rol de soporte.");
    }
}