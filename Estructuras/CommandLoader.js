module.exports = async function (client) {
    const fs = require("fs");

    fs.readdirSync("./Comandos/admin")
        .filter(file => file.endsWith(".js"))
        .forEach(file => {
            const command = require(`../Comandos/admin/${file}`);
            console.log(`[CMD LOADER] El comando ${command.name} fue cargado, sus aliases son: ${command.aliases ? command.aliases.join(", ") : "No tiene aliases"}`);

            client.commands.set(command.name, command);
        });

    fs.readdirSync("./Comandos/general")
        .filter(file => file.endsWith(".js"))
        .forEach(file => {
            const command = require(`../Comandos/general/${file}`);
            console.log(`[CMD LOADER] El comando ${command.name} fue cargado, sus aliases son: ${command.aliases ? command.aliases.join(", ") : "No tiene aliases"}`);

            client.commands.set(command.name, command);
        });

    fs.readdirSync("./Comandos/moderacion")
        .filter(file => file.endsWith(".js"))
        .forEach(file => {
            const command = require(`../Comandos/moderacion/${file}`);
            console.log(`[CMD LOADER] El comando ${command.name} fue cargado, sus aliases son: ${command.aliases ? command.aliases.join(", ") : "No tiene aliases"}`);

            client.commands.set(command.name, command);
        });

    fs.readdirSync("./Comandos/giveaways")
        .filter(file => file.endsWith(".js"))
        .forEach(file => {
            const command = require(`../Comandos/giveaways/${file}`);
            console.log(`[CMD LOADER] El comando ${command.name} fue cargado.`);

            client.commands.set(command.name, command);
        });


    const slashCommands = client.commands.filter(cmd => ["BOTH", "SLASH"].includes(cmd.type))
        .map(cmd => ({
            name: cmd.name.toLowerCase(),
            description: cmd.description,
            permission: [],
            options: cmd.slashCommandOptions,
            defaultPermission: true
        }));

    await client.application.commands.set(slashCommands);
}