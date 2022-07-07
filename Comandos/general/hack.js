const ms = require("ms");

module.exports = {
  name: "hack",
  description: "Comando entretenido",
  category: "general",
  usage: "hack <@user>",
  userPerms: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.channel.send(
        "¡Vamos! Espera... ¿A quién estamos hackeando? 🤔"
      );
    }
    const tohack = message.mentions.members.first();
    let msg = await message.channel.send(`Hackeando a ${tohack.displayName}...`);

    let time = "1s";
    setTimeout(function () {
      msg.edit(`Buscando la contraseña de el correo de ${tohack.displayName}...`);
    }, ms(time));

    let time1 = "6s";
    setTimeout(function () {
      msg.edit(`Correo: ${tohack.displayName}@gmail.com \nContraseña: ********`);
    }, ms(time1));

    let time2 = "9s";
    setTimeout(function () {
      msg.edit("Buscando otras cuentas...");
    }, ms(time2));

    let time3 = "15s";
    setTimeout(function () {
      msg.edit("Ajustando la cuenta de Epic Games...");
    }, ms(time3));

    let time4 = "21s";
    setTimeout(function () {
      msg.edit("Hackeando la cuenta de Epic Games...");
    }, ms(time4));

    let time5 = "28s";
    setTimeout(function () {
      msg.edit("¡Cuenta de Epic Games hackeada!");
    }, ms(time5));

    let time6 = "31s";
    setTimeout(function () {
      msg.edit("Recolectando información...");
    }, ms(time6));

    let time7 = "38s";
    setTimeout(function () {
      msg.edit("Enviando los datos al FBI...");
    }, ms(time7));

    let time8 = "41s";
    setTimeout(function () {
      msg.edit(`Hackeo a ${tohack.displayName} terminado.`);
    }, ms(time8));
  },
};
