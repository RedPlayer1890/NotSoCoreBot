const { MessageEmbed } = require('discord.js');

module.exports = async function () {
    const client = require("../index");
    const db = require("../database/checker");
    const config = require("../Config/config");

    db();

    const commandLoader = require("../Estructuras/CommandLoader");

    console.log(`[IMPORTANTE] Cargando comandos...`);

    commandLoader(client);

    console.log(`=====================================================================`);
    console.log(`[${new Date().toLocaleString()}] El bot ${client.user.tag} ha sido iniciado correctamente.`);
    console.log(`[NSCB] El bot está en ${client.guilds.cache.size} servidores.`);
    console.log(`=====================================================================`);
    
    let guild_count = client.guilds.cache.size;
        let user_count = client.users.cache.size;

        let estados = [
            Primero = {
                name: '!help',
                actividad: 'WATCHING',
                status: 'online'
            },
            Segundo = {
                name: 'Con tu corazón',
                actividad: 'PLAYING',
                status: 'idle'
            },
            Tercero = {
                name: `${guild_count} servidores, ${user_count} usuarios.`,
                actividad: 'COMPETING',
                status: 'dnd'
            },
            Cuarto = {
                name: '¡Actualizaciones constantes!',
                actividad: 'STREAMING',
                status: 'idle'
            },
            Quinto = {
                name: `¡Versión ${client.version}!`,
                actividad: 'PLAYING',
                status: 'online'
            },
            Sexto = {
                name: 'No importa este estado',
                actividad: 'No se establecerá',
                status: 'Escribe lo que quieras acá'
            }
        ];

        let integro = 0;

        setInterval(async () => {
            client.user.setActivity(estados[integro].name, { type: estados[integro].actividad });
            client.user.setStatus(estados[integro].status);

            integro++;

            if (integro == 5) {
                integro = 0;
            }

        }, 10000);

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

            }).catch((error) => canal.send(`\`❌\` Ha ocurrido un error \`\`\`${error.stack}\`\`\``));
        }, 86400000);
    }
}