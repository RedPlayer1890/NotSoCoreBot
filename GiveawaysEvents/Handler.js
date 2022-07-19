const fs = require("fs");

module.exports = async function (client) {
    fs.readdirSync("./GiveawaysEvents", (_err, files) => {
        files.forEach((file) => {
            if (!file.endsWith(".js")) return;
            const event = require(`./${file}`);
            let eventName = file.split(".")[0];
            console.log(`[GiveAwaysEvents] El evento ${eventName} fue cargado.`);
            client.giveawaysManager.on(eventName, (...file) => event.execute(...file, client));
            delete require.cache[require.resolve(`./${file}`)];
        });
    });
}