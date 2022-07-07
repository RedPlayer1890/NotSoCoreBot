const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "suggest",
  description: "Sugerencias",
  usage: "suggest <mensaje>",
  category: "general",
  userPerms: ["ADMINISTRATOR"],
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    if (!message.author.id === "123123") return message.reply(`Comando en desarrollo.`);
    const avatar = message.author.avatarURL;
    const suggestchannel = client.channels.cache.get("987748705681686578");
    const suggestion = args.join(" ");
    if (!suggestion) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("#00ffff")
            .setTitle("Sugerencia")
            .setDescription(`¡Uso incorrecto! Uso: \`!suggest <sugerencia>\``)
        ]
      });
    }

    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#00ffff")
          .setTitle("Sugerencia enviada")
          .setDescription(`¡Gracias por sugerir una mejora!`)
          .setTimestamp()
      ]
    });

    const embed = new MessageEmbed()
      .setAuthor(`¡Sugerencia!`, avatar)
      .setDescription(`${suggestion} \n\nPor: **${message.author.tag}**`)
      .setFooter(`ID: ${message.author.id}`)
      .setColor("#00ffff");

    suggestchannel.send({ embeds: [embed] });
  },
  catch(error) {
    const errorlogs = client.channels.cache.get("987748705681686578");
    message.channel.send({
      content: "¡Ha ocurrido un error ejecutando el comando suggest!"
    });

    errorlogs.send({
      embeds: [
        new MessageEmbed()
          .setColor("#00ffff")
          .setTitle("Error")
          .setDescription(`\`\`\`${error}\`\`\``)
          .addField("**Error en el comando:**", "suggest")
          .addField("**Mensaje de error:**", `\`\`\`${error}\`\`\``)
          .addField("**Fecha del error:**", `\`\`\`${new Date()}\`\`\``)
          .addField("**Canal:**", `\`\`\`${message.channel.name}\`\`\``)
          .addField("**Usuario:**", `\`\`\`${message.author.tag}\`\`\``)
          .addField("**ID de usuario:**", `\`\`\`${message.author.id}\`\`\``)
          .setTimestamp()
      ]
    });
    
  },
};
