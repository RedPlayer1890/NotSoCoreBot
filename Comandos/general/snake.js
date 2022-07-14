const Discord = require("discord.js");
const { Snake } = require("discord-gamecord")

module.exports = {
  name: "snake",
  description: "Juego clásico Snake en discord.",
  category: "general",
  type: "TEXT",
  usage: "snake",
  userPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
          new Snake({
        message: message,
        embed: {
        title: 'Snake',
        color: '#00ffff',
        OverTitle: "Game Over",
        },
        snake: { head: '🟢', body: '🟩', tail: '🟢' },
        emojis: {
          board: '⬛',
          food: '🍎',
          up: '⬆️',
          right: '➡️',
          down: '⬇️',
          left: '⬅️',
        },
        othersMessage: 'No tienes permiso de usar botones en este comando',
      }).startGame();
  },
};
