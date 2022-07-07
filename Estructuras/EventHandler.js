module.exports = async function (client) {
    const fs = require("fs");

    fs.readdirSync("./Eventos")
        .filter(file => file.endsWith(".js"))
        .forEach(file => {
            const event = require(`../Eventos/${file}`);
            console.log(`[NSCB] El evento ${file.split(".")[0]} ha sido cargado`);

            let nombre = file.split(".")[0];

            client.on(nombre, event);
        });
}