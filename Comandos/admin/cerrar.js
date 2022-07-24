const config = require('../../Config/config.json');
const { MessageEmbed, Collection } = require('discord.js');
const { isTicket } = require('../../database/admin');

Collection.prototype.array = function () {
    return [...this.values()];
}

module.exports = {
    name: 'cerrar',
    aliases: ['close'],
    description: 'Cierra un ticket',
    type: 'TEXT',
    usage: 'cerrar',
    category: 'admin',
    userPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    run: async (client, message, args) => {
        const staffRole = message.guild.roles.cache.find(r => r.name === config.rolesInfo.Staff);
        const transcriptChannel = message.guild.channels.cache.find(c => c.name == config.logsChannels.transcriptChannel);

        if (!message.member.roles.cache.has(staffRole.id) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply(`¡Este comando está restringido para el uso de los staffs!`);
        if (!message.channel.topic) return message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor('RED')
                    .setTitle(`Tickets`)
                    .setDescription(`**¡Potencial uso incorrecto!**\nSe ha detectado que el canal no tiene un "Topic"; de este asunto, se sacan datos importantes para el funcionamiento de el sistema de tickets. Si este no es un ticket, procure usar este comando exclusivamente en los canales adecuados.`)
                    .setAuthor(`${message.guild.name} - ${message.author.tag}`)
                    .setTimestamp()
            ]
        });
        if (message.channel.topic.split(" ")[0] !== "ID:" || !message.guild.members.cache.find(m => m.id === message.channel.topic.split(" ")[1])) 
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor('RED')
                        .setTitle(`Tickets`)
                        .setDescription(`**¡Potencial uso incorrecto!**\nSe ha detectado que el canal tiene un "Topic", que no es el adecuado; de este asunto, se sacan datos importantes para el funcionamiento de el sistema de tickets. Si este no es un ticket, procure usar este comando exclusivamente en los canales adecuados.`)
                        .setAuthor(`${message.guild.name} - ${message.author.tag}`)
                        .setTimestamp()
                    ]
                });

        if (!isTicket(message.channel.id)) 
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor('RED')
                        .setTitle(`Tickets`)
                        .setDescription(`**¡Potencial uso incorrecto!**\nSe ha detectado que el canal no es un ticket; Si este no es un ticket, procure usar este comando exclusivamente en los canales adecuados para no ser sancionado.`)
                        .setAuthor(`${message.guild.name} - ${message.author.tag}`)
                        .setTimestamp()
                    ]
                });

        const serverName = message.guild.name;
        const channelName = message.channel.name;
        const channel = message.channel;
        const guild = message.guild;
        const guildIcon = guild.iconURL();
        message.channel.messages.fetch({ limit: 100 }).then(async (messages) => {
            const output = messages.array().reverse();
            const messagesSize = messages.size;

            const html = `<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width">
                    <title>Transcript - ${channelName}</title>
                </head>
                <body>
                    <div class="container">
                        <h1 class="pendejada"><img class="guildImg" src="${guildIcon}" width="100"><p>${serverName}</p></h1>
                        <p class="ticket-name">${channelName}</h3>
                        <p class="message-count">${messagesSize} mensajes.</h4>
                    <ul class="messages"> 
                        ${output.map(m => {
                        return `<li>
                        <br class="clear">
                        <div>
                            <div class="message-info">
                                <img class="avatar" src="${m.author.displayAvatarURL()}">
                                <span class="tag">${m.author.tag}</span>
                                <span class="id">${m.author.id}</span>
                                <span class="time">${new Date().toLocaleString()}</span>
                            </div>
                        </div>
                        ${m.content ? `<p class="message-text">${m.content}</p>` : ''}
                        ${m.embeds.length > 0 ? `
                        <div class="embed">
                        <p class="embed-title">${m.embeds[0].title ? m.embeds[0].title : ''}</p>
                        <p class="embed-description">${m.embeds[0].description ? m.embeds[0].description.trim().split('\n').join('<p>') : ''}</p>
                        ${m.embeds[0].fields && m.embeds[0].fields > 0 ? `
                            <ul class="fields">
                                ${m.embeds[0].fields.map(f => { return `
                                    <li>
                                        <p class="embed-field-name">${f.name}</p>
                                        <p class="embed-field-value">${f.value}</p>
                                    </li>`}).join('')}
                            </ul>` : ''}
                        </div>` : ''}
                        ${m.attachments.size > 0 ? m.attachments.map(attachments => {
                            if (attachments.proxyURL && attachments.name.endsWith('.jpg') || attachments.name.endsWith('.png') || attachments.name.endsWith('.tiff') ) return `<img class="message-image" src="${attachments.proxyURL}">`;
                            if (attachments.url) return `<a href="${attachments.url}" class="boton">Archivo adjunto '${attachments.name}'</a>`;
                        }).join('') : ''}
                        </li>`
                            }).join('')}
                    </ul>
                    </div>
                </body>
                <style>
                html {
                    margin: 0;
                    padding: 0;
                }
                body {
                    background-color: #2C2F33;
                }
                p, span {
                    color: white;
                    font-family: sans-serif;
                    margin: 3px;
                }
                .boton1 {
                    margin-top: 2px;
                    display: inline-block;
                    padding: 6px;
                    font-size: 16px;
                    color: white;
                    background: #4F81EA;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .boton {
                    border: true;
                    color: #DFE4EE;
                    background-color: #4F81EA;
                    border-radius: 5px;
                    padding: 6px;
                    text-align: center;
                    display: inline-block;
                    font-size: 16px;
                    margin: 2px 1px;
                    cursor: pointer;
                }
                .guildImg {
                    position:absolute;
                    top:-30px;
                    left:0px;
                    height: 85px;
                    width: 85px;
                }
                .pendejada {
                    position: relative;
                    margin: 40px;
                    text-align: center;
                    font-size: 30px;
                    font-family: bold;
                }
                .server-name {
                    font-size: 25px;
                    font-weight: bold;
                }
                .ticket-name {
                    font-size: 22px;
                }
                .message-count {
                    font-size: 20px;
                    color: rgb(116, 118, 119);
                }
                .avatar {
                    height: 46px;
                    border-radius: 50%;
                    margin-right: 5px;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                .id {
                    color: rgb(116, 118, 119);
                    font-size: 15px;
                }
                .time {
                    color: rgb(127, 133, 136);
                }
                .message > * {
                    float: left;
                }
                .embed {
                    background-color: rgb(33, 36, 41);
                    margin: 5px;
                    padding: 3px; 
                    border-radius: 5px;
                    border-left: 4px solid #3BCE33;
                }
                .embed-title {
                    font-weight: bold;
                    font-size: 17px;
                }
                .embed-description {
                    font-size: 15px;
                }
                .clear { clear: both; }

                .message-text {
                    color: rgb(218, 224, 227);
                }

                .message-mentions-text {
					color: rgb(217, 171, 18);
				}

                .message-mentions {
                    background-color: rgb(142, 142, 142);
                    border-radius: 5px;
                    padding: 3px;
                    margin: 3px;
                }

                .tag {
                    font-size: 18px;
                }
                .embed-field-name {
                    font-size: 16px;
                    font-weight: bold;
                }
                .embed-field-value {
                    font-size: 14px;
                }
                .message-image { 
                    height: 128px;
                    position: relative;
                    display: inline-block;
                }
                .message-info span {
                    position: relative;
                    bottom: 15px;
                }
                .messages li *:nth-child(3):not(span) {
                    margin-left: 50px;
                }
                </style>
                </html>`;

            const embed1 = new MessageEmbed()
                .setTitle(`Ticket "${channelName}"`)
                .setDescription(`¡El transcript de el canal está listo!\n**-** Contiene ${messagesSize} mensajes.`)
                .setColor('#212429')
                .setTimestamp();

            message.channel.send(`¡El canal se eliminará en 5 segundos!`).then(() => {
                setTimeout(() => {
                    channel.delete();
                }, 5000);
            });

            const ticketCreator = message.guild.members.cache.get(channel.topic.split(" ")[1]);

            try {
                ticketCreator.send({
                    embeds: [embed1],
                    files: [{
                            attachment: Buffer.from(html, 'utf8'),
                            name: `${channelName}.html`
                        }]
                    });
            } catch (e) {
                console.log(e);
            }

            transcriptChannel.send({
                embeds: [embed1],
                files: [{
                        attachment: Buffer.from(html, 'utf8'),
                        name: `${channelName}.html`
                    }]
            });

            // Fin (?)
        });
    }
}