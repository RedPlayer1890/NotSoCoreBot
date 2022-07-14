const config = require("../Config/config.json");

module.exports = async function (message, client) {
    const { existsPrefix, getPrefix } = require('../database/admin');

    let prefijo = config.prefix;

    let hasPrefix = await existsPrefix(message.guild.id);

    if (hasPrefix) {
        const { prefix } = await getPrefix(message.guild.id);
        prefijo = prefix;
    }

    if (!message.content.startsWith(prefijo)) return;

    const args = message.content.slice(prefijo.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (!cmd) return;

    if (cmd.userPerms && !message.member.permissions.has(cmd.userPerms)) return message.reply("`❌` No tienes permisos para ejecutar este comando.");

    cmd.run(client, message, args);
    
}