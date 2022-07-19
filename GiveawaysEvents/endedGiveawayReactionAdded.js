module.exports = {
  async execute(giveaway, member, reaction) {
    reaction.users.remove(member.user);
    member.send(`**¡Ese evento ya ha terminado!**\nSuerte para la próxima.`).catch(e => { console.log(e); });
  }
}