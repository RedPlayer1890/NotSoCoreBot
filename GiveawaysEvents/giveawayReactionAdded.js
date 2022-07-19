const { MessageEmbed } = require("discord.js");
const client = require("../index");
module.exports = {
  async execute(giveaway, reactor, messageReaction) {
    let approved =  new MessageEmbed()
    .setTimestamp()
    .setColor("#2F3136")
    .setTitle("Entrada aprovada. ¡Buena suerte!")
    .setDescription(`Has entrado a [este sorteo](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}).`)
    .setFooter(client.guilds.cache.find(g => g.id === giveaway.guildId).name)
    .setTimestamp();

   let denied =  new MessageEmbed()
    .setTimestamp()
    .setColor("#2F3136")
    .setTitle(":x: Entrada denegada.")
    .setDescription(`Tu entrada a [este sorteo](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) ha sido denegada. Asegúrate de cumplir con los requisitos. Si crees que esto es un error, repórtalo en un ticket en el servidor **${client.guilds.cache.find(g => g.id === giveaway.guildId).name}**.`)
    .setFooter(client.guilds.cache.find(g => g.id === giveaway.guildId).name);

    if (reactor.user.bot) return;
    if(giveaway.extraData) {
      if (giveaway.extraData.server !== "null") {
        try { 
        await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
        return reactor.send({
          embeds: [approved]
        });
        } catch(e) {
          messageReaction.users.remove(reactor.user);
          return reactor.send({
            embeds: [denied]
          }).catch(e => { console.log(e); });
        }
      }
      if (giveaway.extraData.role !== "null" && !reactor.roles.cache.get(giveaway.extraData.role)){ 
        messageReaction.users.remove(reactor.user);
        return reactor.send({
          embeds: [denied]
        }).catch(e => { console.log(e); });
      }

      return reactor.send({
        embeds: [approved]
      }).catch(e => { console.log(e); });
    } else {
        return reactor.send({
          embeds: [approved]
        }).catch(e => { console.log(e); });
    }
    }
  }
