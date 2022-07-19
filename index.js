const config = require("./Config/config.json");
const { Client, Intents, Collection } = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
const allIntents = new Intents(32767);
const client = new Client({ intents: allIntents });
const AntiCrash = require("./Utils/AntiCrash");
const giveawaysHandler = require("./GiveawaysEvents/Handler");

AntiCrash();

client.giveawaysManager = new GiveawaysManager(client, {
  storage: config.giveawaysDB,
  default: {
    botsCanWin: false,
    embedColor: "#00ffff",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: `🛑 **Última oportunidad de entrar** 🛑`,
      threshold: 5000,
      embedColor: '#00ffff'
    }
  }
});

giveawaysHandler(client);

client.commands = new Collection();

const cargaEventos = require("./Estructuras/EventHandler");

client.version = "4.0.0";
client.lastUpdate = () => {
  return "19/07/2022";
}

cargaEventos(client);

module.exports = client;

client.login(config.token);