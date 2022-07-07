module.exports = async function () {
    const client = require("../index");
    const db = require("../database/checker");
    const config = require("../Config/config");

    db();

    console.log(`=====================================================================`);
    console.log(`[${new Date().toLocaleString()}] El bot ${client.user.tag} ha sido iniciado correctamente.`);
    console.log(`[NSCB] El bot está en ${client.guilds.size} servidores.`);
    console.log(`=====================================================================`);

    const commandLoader = require("../Estructuras/CommandLoader");

    console.log(`[IMPORTANTE] Cargando comandos...`);

    commandLoader(client);

    console.log(`[IMPORTANTE] Si es la primera vez que enciendes el bot, asegúrate de revisar el archivo ./Config/config.json para configurar múltiples valores.`);

    if (config.memesDiarios.activado) {
        setInterval(() => {
            const red = require('reddit-fetch');
            const canal = client.guilds.cache.find(g => g.id === config.memesDiarios.servidorID).channels.cache.find(c => c.name === config.memesDiarios.canal);

            if (!canal) console.log("[NSCB] No se ha podido encontrar el canal de memes diarios.");

            red({
                subreddit: 'SpanishMeme',
                sort: 'hot',
                allowNSFW: false,
                allowModPost: false,
                allowCrossPost: false,
                allowVideo: false
            }).then(post => {
                if (!post.url) return canal.send("`❌` No se encontraron memes hoy.");

                const embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(post.title)
                    .setImage(post.url)

                canal.send({
                    embeds: [embed]
                });

            }).catch((error) => message.channel.send(`\`❌\` Ha ocurrido un error \`\`\`${error.stack}\`\`\``));
        }, 86400000);
    }
}