const {
  MessageEmbed
} = require("discord.js");
const config = require("../../Config/config.json");

module.exports = {
  name: "report",
  description: "Reporta un bug",
  aliases: ["bug"],
  type: "BOTH",
  slashCommandOptions: [
    {
      name: "bug",
      description: "Reporta un bug",
      type: "STRING",
      required: true
    }
],
  usage: "report <bug>",
  category: "general",
  userPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    const reportchannel = client.channels.cache.get(config.reportesBugs.canalID);
    const report = args.join(" ");
    if (!report) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
          .setColor("#00ffff")
          .setTitle("Reportar un error")
          .setDescription(`¡Uso incorrecto! Debes específicar el reporte que quieras hacer.`)
        ]
      });
    }

    if (!config.reportesBugs.activado) message.reply(`Desafortunadamente, la función de reportes de bugs, está desactivada.`);

    message.channel.send({
      embeds: [
        new MessageEmbed()
        .setColor("#00ffff")
        .setTitle("Reporte enviado")
        .setDescription(`¡Gracias por reportar un error!`)
        .setTimestamp()
      ]
    });

    const embed = new MessageEmbed()
      .setTitle("Reporte de bug")
      .setDescription(`${report} \n\nPor: ${message.author.tag}`)
      .setFooter(`ID de usuario: ${message.author.id}`)
      .setColor("RANDOM");

    reportchannel.send({
      embeds: [embed]
    }).catch(error => {
      const errorlogs = client.channels.cache.get(config.reportesBugs.canalID);
      message.channel.send({
        content: "¡Ha ocurrido un error ejecutando el comando report!"
      });

      errorlogs.send({
        embeds: [
          new MessageEmbed()
          .setColor("#00ffff")
          .setTitle("Error")
          .setDescription(`\`\`\`${error}\`\`\``)
          .addField("**Error en el comando:**", "report")
          .addField("**Mensaje de error:**", `\`\`\`${error}\`\`\``)
          .addField("**Fecha del error:**", `\`\`\`${new Date()}\`\`\``)
          .addField("**Canal:**", `\`\`\`${message.channel.name}\`\`\``)
          .addField("**Usuario:**", `\`\`\`${message.author.tag}\`\`\``)
          .addField("**ID de usuario:**", `\`\`\`${message.author.id}\`\`\``)
          .setTimestamp()
        ]
      });
    });
  },
  slash: async function (interaction, args, client) {
    const error = interaction.options.get("bug").value;

    const reportchannel = client.channels.cache.get(config.reportesBugs.canalID);
    const embed = new MessageEmbed()
      .setTitle("Reporte de bug")
      .setDescription(`${error} \n\nPor: ${interaction.message.author.tag}`)
      .setFooter(`ID de usuario: ${interaction.message.author.id}`)
      .setColor("RANDOM");

    reportchannel.send({
      embeds: [embed]
    }).then(() => {
      interaction.user.send({
        embeds: [
          new MessageEmbed()
          .setColor("#00ffff")
          .setTitle("Reporte enviado")
          .setDescription(`¡Gracias por reportar un error!`)
          .setTimestamp()
        ]
      });
    }).catch(error => {
      const errorlogs = client.channels.cache.get(config.reportesBugs.canalID);
      errorlogs.send({
        content: "¡Ha ocurrido un error ejecutando el comando report!",
        embeds: [
          new MessageEmbed()
          .setColor("#00ffff")
          .setTitle("Error")
          .setDescription(`\`\`\`${error}\`\`\``)
          .addField("**Error en el comando:**", "report")
          .addField("**Mensaje de error:**", `\`\`\`${error}\`\`\``)
          .addField("**Fecha del error:**", `\`\`\`${new Date()}\`\`\``)
          .addField("**Canal:**", `\`\`\`${interaction.channel.name}\`\`\``)
          .addField("**Usuario:**", `\`\`\`${interaction.user.tag}\`\`\``)
          .addField("**ID de usuario:**", `\`\`\`${interaction.user.id}\`\`\``)
          .setTimestamp()
        ]
      });
    });
  }
};