const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "userinfo",
    description: "Get info about your account or mentiobned user's account!",
    usage: "userinfo [@user]",
    type: "TEXT",
    category: "general",
    userPerms: ["SEND_MESSAGES"],
    aliases: ["ui"],
    run: async (client, message, args) => {
        const permissions = {
            "ADMINISTRATOR": "Administrador",
            "MANAGE_GUILD": "Administrar servidor",
            "MANAGE_ROLES": "Administrar roles",
            "MANAGE_CHANNELS": "Administrar canales",
            "KICK_MEMBERS": "Expulsar miembros",
            "BAN_MEMBERS": "Banear miembros",
            "MANAGE_NICKNAMES": "Administrar apodos",
            "MANAGE_EMOJIS": "Administrar emojis",
            "MANAGE_WEBHOOKS": "Administrar integraciones",
            "MANAGE_MESSAGES": "Administrar mensajes",
            "MENTION_EVERYONE": "Mencionar a everyone"
        }
        const mention = message.mentions.members.first() || message.member;
        const nick = mention.nickname === null ? "Ninguno" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "Ninguno" : mention.roles.cache.get;
        const usericon = mention.user.avatarURL;
        const mentionPermissions = mention.permissions.toArray() === null ? "Ninguno" : mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        var flags = {
            "": "Ninguna",
            "DISCORD_EMPLOYEE": "Trabajador de discord",
            "DISCORD_PARTNER": "Partner de discord",
            "BUGHUNTER_LEVEL_1": "Cazador de bugs (Nivel 1)",
            "BUGHUNTER_LEVEL_2": "Cazador de bugs (Nivel 2)",
            "HYPESQUAD_EVENTS": "Eventos Hypesquad",
            "HOUSE_BRILLIANCE": "HypeSquad Brilliance",
            "HOUSE_BRAVERY": "HypeSquad Bravery",
            "HOUSE_BALANCE": "HypeSquad Balance",
            "EARLY_SUPPORTER": "Early Supporter",
            "TEAM_USER": "Team User",
            "VERIFIED_BOT": "Bot verificado",
            "EARLY_VERIFIED_DEVELOPER": "Desarrollador de bots verificado"
        };
        var bot = {
            "true": "El usuario es un bot.",
            "false": "El usuario es un humano."
        };
        const userlol = new Discord.MessageEmbed()
        .setAuthor(`Información de el usuario`, mention.user.avatarURL())
        .setThumbnail(usericon)
        .addField(`Información general`, `Nombre: \`${mention.user.username}\` \nTag: \`${mention.user.discriminator}\` \nApodo: \`${nick}\``)
        .addField(`Overview`, `Insignias: \`${flags[mention.user.flags.toArray().join(", ")]}\`\nEs bot: \`${bot[mention.user.bot]}\``)
        .addField(`Información en el servidor`, `Roles: <@&${mention._roles.join(">  <@&")}> \nPermisos principales: \`${finalPermissions.join(', ')}\``)
        .addField(`Información del usuario`, `Cuenta creada el: \n\`${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \nSe unió al servidor el: \n\`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
        .setThumbnail(mention.user.avatarURL())
        .setFooter(`ID: ${mention.user.id}`, mention.user.avatarURL())
        .setTimestamp()
        .setColor("#00ffff");
        message.channel.send({ embeds: [userlol] })
    }
}
