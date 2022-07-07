const config = require("./Config/config.json");
const { Client, Intents, Collection } = require("discord.js");
const allIntents = new Intents(32767);
const client = new Client({
  intents: allIntents
});
const AntiCrash = require("./Utils/AntiCrash");

AntiCrash();

client.commands = new Collection();

const cargaEventos = require("./Estructuras/EventHandler");

cargaEventos(client);

module.exports = client;

client.login(config.token);