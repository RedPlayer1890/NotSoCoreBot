const config = require("../Config/config.json");
const { MessageEmbed } = require("discord.js");

module.exports = async function (client) {
    process.on('unhandledRejection', async (error, promise) => { 
        if (config.canalErrores.activo) {
            const canal = client.channels.cache.get(config.canalErrores.id);
            const embed = new MessageEmbed()
                .setColor("#00ffff")
                .setTitle(`${error.stack.split("\n").join(", ")}`)
                .addField("Error Message", `${error.message}`)
                .addField("Error Stack", `${error.stack}`)
                .addField("Promise State", `${promise.state}`)
                .addField("Fecha", `${new Date()}`)
                .setTimestamp();
            return canal.send({ embeds: [embed] });
        }

        if (config.noCanalLogErrores) return console.log(`[IMPORTANTE] Ha ocurrido un error, y no está permitido enviar mensajes en el canal de errores.\n* [${error}]\n${error.stack.split("\n").join("\n-- ")}`);
    });

    process.on('uncaughtException', async (error, promise) => {
        if (config.canalErrores.activo) {
            const canal = client.channels.cache.get(config.canalErrores.id);
            const embed = new MessageEmbed()
                .setColor("#00ffff")
                .setTitle(`${error.stack.split("\n").join(", ")}`)
                .addField("Error Message", `${error.message}`)
                .addField("Error Stack", `${error.stack}`)
                .addField("Promise State", `${promise.state}`)
                .addField("Fecha", `${new Date()}`)
                .setTimestamp();
            return canal.send({ embeds: [embed] });
        }

        if (config.noCanalLogErrores) return console.log(`[IMPORTANTE] Ha ocurrido un error, y no está permitido enviar mensajes en el canal de errores.\n* [${error}]\n${error.stack.split("\n").join("\n-- ")}`);
    });
}