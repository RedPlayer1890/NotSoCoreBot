const config = require('../Config/config.json');
const sqlite3 = require('sqlite3').verbose();
const dir = config.dirbase;
const sql = new sqlite3.Database(dir);

module.exports = async function () {
    try {
        sql.run('CREATE TABLE IF NOT EXISTS prefixes (guildID TEXT, prefix TEXT, status INTEGER DEFAULT 0)');
        sql.run('CREATE TABLE IF NOT EXISTS ips (guildID TEXT, IP TEXT)');
        sql.run('CREATE TABLE IF NOT EXISTS tickets (channelID TEXT, checkChannel BOOLEAN DEFAULT 0)');
        sql.run('CREATE TABLE IF NOT EXISTS tickets_creators (channelID TEXT, userID TEXT)');
    } catch (err) {
        console.log(err);
    }
}