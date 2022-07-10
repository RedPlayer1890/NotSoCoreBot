const handler = require('../Estructuras/CommandHandler');
const config = require('../Config/config.json');

module.exports = async function (message) {
    const client = require('../index');

    const { existsPrefix, getPrefix } = require('../database/admin');

    if (message.mentions.members && message.mentions.members.first().id === client.user.id && message.type !== 'REPLY') {
        let bool = await existsPrefix(message.guild.id);
        if (bool) {
            const {prefix} = await getPrefix(message.guild.id);
            
            return message.reply(`¡Hola! Si quieres usar mis comandos, usa mi prefix: ${prefix}`);
        }

        return message.reply(`¡Hola! Si quieres usar mis comandos, usa mi prefix: ${config.prefix}`);
    }

    if (!message.guild) return;
    if (message.author.bot) return;

    handler(message, client);
}