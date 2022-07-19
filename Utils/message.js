const config = require('../Config/config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **Sorteo** 🎉",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **Sorteo Terminado** 🎉",
  drawing:  `Termina: **{timestamp}**`,
  inviteToParticipate: `Reacciona con 🎉 para participar`,
  winMessage: "¡Felicidades, {winners}! Ganaste **{this.prize}**",
  embedFooter: "Sorteos",
  noWinner: "Sorteo cancelado. No hay ganadores.",
  hostedBy: "Patrocinado por: {this.hostedBy}",
  winners: "Ganador(es)",
  endedAt: "Terminado el"
}