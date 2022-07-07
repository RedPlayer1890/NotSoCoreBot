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
        guild.roles.create(config.rolesInfo.Staff, {
            color: 'BLUE',
            permissions: [],
            position: 13,
            reason: 'Role de soporte.',
            mentionable: false
        });
    },
    ifNotOwnerRole: async function ({
        guild: guild
    }) {
        const config = require('../Config/config.json');

        guild.roles.create(config.rolesInfo.Owner, {
            color: 'RED',
            permissions: [],
            position: 15,
            reason: 'Role de dueño.',
            mentionable: false
        });
    }
}