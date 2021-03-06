const config = require('../Config/config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "๐ **Sorteo** ๐",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "๐ **Sorteo Terminado** ๐",
  drawing:  `Termina: **{timestamp}**`,
  inviteToParticipate: `Reacciona con ๐ para participar`,
  winMessage: "ยกFelicidades, {winners}! Ganaste **{this.prize}**",
  embedFooter: "Sorteos",
  noWinner: "Sorteo cancelado. No hay ganadores.",
  hostedBy: "Patrocinado por: {this.hostedBy}",
  winners: "Ganador(es)",
  endedAt: "Terminado el"
}