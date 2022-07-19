const glob = require('glob');
const fs = require('fs');

module.exports = {
    name: 'reloadcmds',
    aliases: [],
    type: 'TEXT',
    category: 'admin',
    slashCommandOptons: [],
    description: 'Recarga todos los comandos.',
    permisos: ["ADMINISTRATOR"],
    run: async function (client, message, args) {

        fs.readdirSync('./Comandos/').forEach(carpeta => {
            console.log(`[NSCB] Re-cargando comandos de la carpeta "${carpeta}".`);

            fs.readdirSync(`./Comandos/${carpeta}/`).forEach(archivo => {
                if (archivo.endsWith('.js')) {
                    delete require.cache[require.resolve(`../../Comandos/${carpeta}/${archivo}`)];
                    const pull = require(`../../Comandos/${carpeta}/${archivo}`);

                    if(pull.name) {
                        client.commands.set(pull.name, pull);
                    }

                    console.log(`[NSCB] Comando ${pull.name} recargado`);
                }

                else console.log(`[NSCB] No se pudo recargar el comando ${archivo}`);
            });
        })

        message.reply(`✅ Se han recargado todos los comandos correctamente.`)
    }
}