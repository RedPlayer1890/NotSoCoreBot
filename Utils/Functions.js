module.exports = {
    awaitedMessages: async function ({
        channel: channel,
        filter: filter
    }) {
        return new Promise(async (resolve, reject) => {
            const awaitedMessages = [];
            const awaitedMessage = await channel.awaitMessages({
                filter: filter,
                max: 1,
                time: 60000,
                errors: ['time']
            }).catch(err => {
                reject(err);
            });
            awaitedMessages.push(awaitedMessage.first());
            resolve(awaitedMessages);
        });
    },
    getRandomInt: function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomColor: function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    ifNotSupportRole: async function ({
        guild: guild
    }) {
        const config = require('../Config/config.json');
        guild.roles.create({
            name: config.rolesInfo.Staff,
            color: '#0099ff',
            reason: 'Se necesita el rol de Staff para poder abrir tickets.'
        });
    },
    ifNotOwnerRole: async function ({
        guild: guild
    }) {
        const config = require('../Config/config.json');

        guild.roles.create({
            name: config.rolesInfo.Owner,
            color: '#0099ff',
            reason: 'Se necesita el rol de Owner para poder abrir tickets.'
        })
    },
    checkIfAtt: async function ({ message: message }) {
        return new Promise(async (resolve, reject) => {
            
            var respuesta;

            if (message.first().content === ``) {
                if (!message.first().attachments || message.first().attachments.size === 0) respuesta = message.first().content;
                respuesta = message.first().attachments.map(m => `${m.proxyURL}`).join(`\n`);
            }
            if (message.first().content !== ``) {
                if (message.first().attachments && message.first().attachments.size !== 0) respuesta = `\n> **Texto**\n${message.first().content}\n\n> **Enlaces Incluidos**\n${message.first().attachments.map(m => `${m.proxyURL}`).join(`\n`)}`;

                else respuesta = message.first().content;
            }

            resolve(respuesta);
        })
    }
}