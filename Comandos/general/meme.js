const { MessageEmbed } = require('discord.js');
const red = require('reddit-fetch');

module.exports = {
  name: "meme",
  description: "Envía un meme aleatorio.",
  category: "general",
  type: "BOTH",
  usage: "meme",
  slashCommandOptions: [],
  userPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    red({
      subreddit: 'SpanishMeme',
      sort: 'hot',
      allowNSFW: false,
      allowModPost: false,
      allowCrossPost: false,
      allowVideo: false
    }).then(post => {
      if (!post.url) return canal.send("`❌` No se encontraron memes hoy.");

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(post.title)
        .setImage(post.url)

      message.channel.send({
        embeds: [embed]
      });
    });
  },
  slash: async function (client, interaction, args) {

    red({
      subreddit: 'SpanishMeme',
      sort: 'hot',
      allowNSFW: false,
      allowModPost: false,
      allowCrossPost: false,
      allowVideo: false
    }).then(post => {
      if (!post.url) return interaction.reply("`❌` No se encontraron memes hoy.");

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(post.title)
        .setImage(post.url)

      interaction.reply({
        embeds: [embed]
      });
    });
  }
}