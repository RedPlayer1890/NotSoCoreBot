const database = require("./checker");
const config = require("../Config/config.json");
const queries = require("./queries");

module.exports = {

    isTicket: async function (channelId) {
        let query = "SELECT * FROM tickets WHERE channelId = ?"
        let result = await queries.getQuery(query, channelId)
        if (result) {
            return result;
        } else {
            return false;
        }
    },

    newTicket: async function (channelId, boolean) {
        let query = "INSERT INTO tickets (channelId, checkchannel) VALUES(?, ?)"
        await queries.runQuery(query, [channelId, boolean])
    },

    deleteTicket: async function (channelId) {
        let query = "DELETE FROM tickets WHERE channelId = ?"
        try {
            await queries.runQuery(query, [channelId]);
        } catch (error) {
            console.error(error)
        }
    },

    // REVIEW: Prefixes functions - SQLITE3
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
    }
}