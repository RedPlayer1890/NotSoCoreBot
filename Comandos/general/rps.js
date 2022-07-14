const simplydjs = require("simply-djs");

module.exports = {
  name: "rps",
  description: "Piedra, papel o tijeras en discord.",
  category: "general",
  type: "TEXT",
  usage: "rps <@user>",
  userPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    simplydjs.rps(message)
  },
};
