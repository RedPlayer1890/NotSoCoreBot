const { hasTickets, getTickets } = require("../database/admin");
const client = require("../index");

module.exports = async function (member) {
    let bool = await hasTickets(member.id);

    console.log(`[DB] ${member.user.username} ha sido expulsado de ${member.guild.name}.`);

    if (bool) {
        let tickets = await getTickets(member.id);

        console.log(tickets)
    }
}