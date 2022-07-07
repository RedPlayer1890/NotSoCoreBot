const simplydjs = require("simply-djs")

module.exports = {
  name: "calculadora",
  description: "Hace lo mismo que una calculadora pues.",
  category: "general",
  usage: "calculadora <operacion>",
  userPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    simplydjs.calculator(message, {
    embedColor: '#00ffff',
    });
  },
};
