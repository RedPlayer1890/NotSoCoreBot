const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "meme",
  description: "Envía un meme aleatorio.",
  category: "general",
  usage: "meme",
  userPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    const red = require('reddit-fetch');

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
  }
}