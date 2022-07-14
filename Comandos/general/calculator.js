const simplydjs = require("simply-djs")

module.exports = {
  name: "calculadora",
  description: "Hace lo mismo que una calculadora pues.",
  type: "BOTH",
  category: "general",
  slashCommandOptions: [
    {
      name: "operacion",
      type: "STRING",
      description: "La operación que se quiere realizar.",
      required: true
    }
  ],
  usage: "calculadora <operacion>",
  userPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    simplydjs.calculator(message, {
    embedColor: '#00ffff',
    });
  },
  slash: async (interaction, args, client) => {
    simplydjs.calculator(interaction.options.get("operacion").value, {
    embedColor: '#00ffff',
    });
  }
}
