const database = require("./checker");
const config = require("../Config/config.json");
const queries = require("./queries");

module.exports = {
    //TypeDef: (String) guildID, (String) prefix

    existsPrefix: async function (idserver) {
        let query = "SELECT * FROM prefixes WHERE guildID = ?";
        let result = await queries.getQuery(query, idserver);

        if (result != undefined) {
            return true;

        } else {
            return false;

        }
    },
    addPrefix: async function (idserver, prefix) {
        let query = "INSERT INTO prefixes (guildID, prefix) VALUES(?, ?)";
        await queries.runQuery(query, [idserver, prefix]);

    },
    getPrefix: async function (idserver) {
        let query = "SELECT * FROM prefixes WHERE guildID = ?";
        let result = await queries.getQuery(query, idserver);

        return result;

    },
    updatePrefix: async function (idserver, prefix) {
        let query = "UPDATE prefixes SET prefix = ? WHERE guildID = ?";
        await queries.runQuery(query, [prefix, idserver]);

    },
    deletePrefix: async function (idserver) {
        let query = "DELETE FROM prefixes WHERE guildID = ?";
        await queries.runQuery(query, idserver);

    },

    // Review: IPS functions - SQLITE3
    // TypeDef: {guildID: string, IP: string}

    hasIP: async function (guildID) {
        let query = "SELECT * FROM ips WHERE guildID = ?";
        let result = await queries.getQuery(query, guildID);

        if (!result === undefined)
            return true;


        return false;
    },

    getIP: async function (guildID) {
        let query = "SELECT * FROM ips WHERE guildID = ?";
        let result = await queries.getQuery(query, guildID);

        if (result !== undefined) {
            return result;
        }

        return undefined;
    },

    setIP: async function (guildID, IP) {
        let query = "INSERT INTO ips (guildID, IP) VALUES (?, ?)";
        await queries.runQuery(query, [guildID, IP]);
    },

    updateIP: async function (guildID, IP) {
        let query = "UPDATE ips SET IP = ? WHERE guildID = ?";
        await queries.runQuery(query, [IP, guildID]);
    },

    deleteIP: async function (guildID) {
        let query = "DELETE FROM ips WHERE guildID = ?";
        await queries.runQuery(query, guildID);
    },

    // Tickets functions - SQLITE3

    isTicket: async function (channelId) {
        let query = "SELECT * FROM tickets WHERE channelId = ?"
        let result = await queries.getQuery(query, channelId)

        if (result) {
            return result;
        } else {
            return false;
        }
    },

    newTicket: async function (channelId, boolean, userId) {
        let query = "INSERT INTO tickets (channelID, checkchannel) VALUES(?, ?)";
        await queries.runQuery(query, [channelId, boolean]);

        let query2 = "INSERT INTO tickets_creators (channelID, userID) VALUES(?, ?)";
        await queries.runQuery(query2, [channelId, userId]);
    },

    deleteTicket: async function (channelId) {
        let query = "DELETE FROM tickets WHERE channelId = ?"
        try {
            await queries.runQuery(query, [channelId]);
        } catch (error) {
            console.error(error)
        }
    },

    getTickets: async function (userId) {
        let query = "SELECT * FROM tickets_creators WHERE userID = ?";
        let result = await queries.getQuery(query, userId);

        return result;
    },
    
    hasTickets: async function (userId) {
        let query = "SELECT * FROM tickets_creators WHERE userID = ?";
        let result = await queries.getQuery(query, userId);

        if (result !== undefined) {
            return true;
        }

        return false;
    }
}