const { isTicket } = require('../../database/admin');
const config = require('../../Config/config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rename',
    aliases: ['renombrar'],
    type: 'TEXT',
    slashCommandOptions: [],
    description: 'Cambia el nombre de un ticket.',
    category: 'admin',
    userPerms: ["SEND_MESSAGES"],
    run: async function (client, message, args) {
        let admRole = message.guild.roles.cache.find(r => r.name === config.rolesInfo.Staff);
        let embed1 = new MessageEmbed()
            .setTitle('¡No tienes permiso!')
            .setDescription('Lo que dice arriba pues wacho.')
            .setColor('#F11717');

        if (!message.member.roles.cache.has(admRole.id)) return message.reply({
            embeds: [embed1]
        });

        let canal = message.channel;
        let embed2 = new MessageEmbed()
            .setTitle('¡Estás usando mal este comando!')
            .setDescription('Este comando es usado específicamente para cambiar los nombres en tickets. Su uso correcto es el siguiente: \`!rename <Nuevo nombre de el canal>\`')
            .setColor('#F11717');

        let argumentos = args.slice(0).join(' ');

        if (!argumentos) return message.reply({
            embeds: [embed2]
        });

        let check = await isTicket(message.channel.id);
        if (check) {
            canal.setName(argumentos);
            let embed3 = new MessageEmbed()
                .setDescription(`Canal renombrado.\nNuevo nombre: ${message.channel}`)
            message.channel.send({
                embeds: [embed3]
            });
            message.delete();
        } else {
            message.reply({
                embeds: [embed2]
            });
        }
    }
}