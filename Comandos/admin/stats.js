const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'stats',
    aliases: [],
    type: 'TEXT',
    category: 'admin',
    slashCommandOptions: [],
    description: 'Muestra el estado del bot.',
    userPerms: ["SEND_MESSAGES"],
    run: async function (client, message, args) {
        const embedEstado = new MessageEmbed();

        let ultimaActualizacion = await client.lastUpdate();

        embedEstado.setColor("#2C2F33");
        embedEstado.setTitle("Estadísticas actuales de el bot.");

        embedEstado.setDescription(`¡Hola! Soy un bot desarrollado por **RedPlay1890#2361** para HoliCraft Network.\n\nSi requieres soporte de el desarrollador con algún problema de el mismo bot, ¡te invito a su [discord](https://discord.gg/x7pP9YytDt)!`);

        embedEstado.addField("Mi ping actual", `${client.ws.ping}ms`);
        embedEstado.addField("Versión actual", `${client.version}`);
        embedEstado.addField("Guilds a las que sirvo", `${client.guilds.cache.size} servidores`);
        embedEstado.addField("Usuarios a los que sirvo", `${client.users.cache.size} usuarios`);
        embedEstado.addField("Fecha de creación", `${client.user.createdAt.toLocaleDateString()}`);
        embedEstado.addField("Última actualización", `${ultimaActualizacion}`);
        

        message.channel.send({
            embeds: [embedEstado]
        });
    }
}