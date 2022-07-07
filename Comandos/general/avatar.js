const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'avatar',
  aliases: ['pfp'],
  type: 'BOTH',
  category: 'general',
  slashCommandOptions: [{
      name: 'user',
      type: 'USER',
      required: false,
      description: 'Usuario cuyo avatar quieres ver.'
  }],
  description: 'Muestra el avatar de los usuarios.',
  permisos: ["SEND_MESSAGES"],
  run: async function (client, message, args) {

      let embedSolo = new MessageEmbed()
          .setTitle(`Avatar de ${message.author.tag}`)
          .setImage(message.author.avatarURL({
              format: "png",
              dynamic: true,
              size: 1024
          }))
          .setColor("YELLOW")
          .setTimestamp()
          .setFooter(`Avatar de ${message.author.tag}`);

      if (message.mentions.members.first()) {
          let embededAvatar = new MessageEmbed()
              .setTitle(`Avatar de ${message.mentions.members.first().user.username}${message.mentions.members.first().user.avatarURL()}`)
              .setImage(message.mentions.members.first().user.avatarURL({
                  format: "png",
                  dynamic: true,
                  size: 1024
              }))
              .setColor("YELLOW")
              .setTimestamp();

          return message.reply({
              embeds: [embededAvatar]
          });
      }

      if (args[0]) {
          let member = message.guild.members.cache.get(args[0]);
          if (member) {
              let embededAvatar = new MessageEmbed()
                  .setTitle(`Avatar de ${member.user.username}${member.user.avatarURL()}`)
                  .setImage(member.user.avatarURL({
                      format: "png",
                      dynamic: true,
                      size: 1024
                  }))
                  .setColor("YELLOW")
                  .setTimestamp();

              return message.reply({
                  embeds: [embededAvatar]
              });
          }
      }

      return message.reply({
          embeds: [embedSolo]
      });
  },
  slash: async function (interaction, args, client) {
      if (interaction.options.get("user")) {
          let miembro = interaction.options.get("user").user;
          if (miembro) {
              let embededAvatar = new MessageEmbed()
                  .setTitle(`Avatar de ${miembro.username}`)
                  .setImage(miembro.avatarURL({ format: "png", dynamic: true, size: 1024 }))
                  .setColor("YELLOW")
                  .setTimestamp();

              return interaction.reply({ embeds: [embededAvatar] });
          }
          return interaction.reply({
              content: "¡No se ha podido encontrar el usuario!",
              ephemeral: true
          });
      } 

      //interaction.options.get("user") ? interaction.reply(`<:check:936368925481009172> Avatar de ${interaction.options.get("user").user.username}`) : interaction.reply(`<:check:936368925481009172> Avatar de ${interaction.author.username}`);
      
      if (!interaction.options.get("user")) {
          let embedSolo = new MessageEmbed()
              .setTitle(`Avatar de ${interaction.user.username}`)
              .setImage(interaction.user.avatarURL({
                  format: "png",
                  dynamic: true,
                  size: 1024
              }))
              .setColor("YELLOW")
              .setTimestamp();

          return interaction.reply({
              embeds: [embedSolo]
          });

      }


  }
}