module.exports = {
	name: 'catchthefish',
	aliases: ['ctf'],
	category: 'general',
	usage: 'catchthefish',
	description: 'Juega al juego de pescar',
	run: async (client, message, args) => {
		const positions = {
			safe: '_ _                          :fish:\n            _ _              :hand_splayed:\n            _ _              :cat:',
			danger: '_ _                          :bomb:\n            _ _              :hand_splayed:\n            _ _              :cat:',
			win: '_ _           :crown:**Ganaste.**:crown:\n_ _                      :hand_splayed:\n_ _                      :cat:',
			lose: '_ _           :skull:**Perdiste.**:skull:             \n_ _                      :hand_splayed:\n_ _                      :cat:',
		};

		let randomized = Math.floor(Math.random() * 2);
		let gameEnded = false;
		let randomPos = positions[Object.keys(positions)[randomized]];
		let data = 0;

		const componentsArray = [{
			type: 1,
			components: [{
					type: 2,
					style: 'SECONDARY',
					custom_id: 'e',
					label: '\u200b',
					disabled: true,
				},
				{
					type: 2,
					style: 'PRIMARY',
					custom_id: String(Math.random()),
					emoji: {
						id: '890611575227023391'
					},
				},
				{
					type: 2,
					style: 'SECONDARY',
					custom_id: 'ee',
					label: '\u200b',
					disabled: true,
				},
			],
		}, ];

		const msg = await message.channel.send({
			content: `Pesca 3 peces para ganar.\n\n${randomPos}`,
			components: componentsArray,
		});

		const filter = (button => {
			return button.user.id === message.author.id;
		});
		const game = await message.channel.createMessageComponentCollector({
			filter,
			componentType: 'BUTTON',
		});

		function update(button) {
			randomized = Math.floor(Math.random() * 2);
			randomPos = positions[Object.keys(positions)[randomized]];

			if (data === 3) {
				gameEnded = true;
				game.stop();
				componentsArray[0].components[1].disabled = true;

				msg.edit({
					content: positions.win,
					components: componentsArray,
				});
				button.reply({
					content: '¡Felicidades! Cazaste 3 peces.'
				});
			} else if (data <= -9) {
				gameEnded = true;
				game.stop();
				componentsArray[0].components[1].disabled = true;

				msg.edit({
					content: positions.lose,
					components: componentsArray,
				});
				button.reply({
					content: 'Buen juego, ¡juguemos de nuevo!'
				});
			} else {
				if (button) return button.deferUpdate();
				msg.edit({
					content: randomPos + `           **${data}**`,
					components: componentsArray,
				});
			}
		}

		setInterval(() => {
			if (gameEnded === false) return update();
		}, 2000);

		game.on('collect', async (button) => {
			if (randomized !== 0) {
				data -= 3;
				update(button);
			} else {
				data++;
				update(button);
			}
		});
	},
};