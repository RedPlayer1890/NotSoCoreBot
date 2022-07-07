module.exports = {
  name: "meme",
  description: "Envía un meme aleatorio.",
  category: "general",
  usage: "meme",
  userPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    var num = Math.floor(Math.random() * (500 - 1) + 1);
    message.channel.send({
      files: [
        {
          attachment: `https://ctk-api.herokuapp.com/meme/${num}`,
          name: "meme.jpg",
        },
      ],
    });
  },
};
