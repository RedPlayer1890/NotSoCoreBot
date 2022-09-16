const { isTicket } = require("../database/admin");
const db = require("../database/admin");
const client = require("../index");

module.exports = async function (channel) {
    if (channel.type === "GUILD_TEXT") {
        let bool = await isTicket(channel.id);

        if (bool.checkChannel) {
            db.deleteTicket(channel.id);

            console.log(`[DB] Ticket ${channel.name} borrado de la database.`);
        }
    }
}