require("dotenv").config();
const petPetGif = require("pet-pet-gif");
const axios = require('axios');

const { Client, Intents, MessageAttachment, User } = require("discord.js");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
	if (msg.content.startsWith("pet")) {
		
		let user, avatar, id, avatarUrl;

		if (msg.mentions.users.first()) {
			user = msg.mentions.users.first();
			avatar = user.avatar;
			if (!avatar) {
				return msg.channel.send(`<@${user.id}> no image no pets!`);
			}
			avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
		} 
		else {
			user = msg.author;
			searchQuery = msg.content.split(" ")[1];

			let url = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${process.env.PHOTO_API_TOKEN}`
			let response = await axios.get(url)

			avatarUrl = response.data.results[0].urls.small;
		}

		if (!avatar) {
			return msg.channel.send(`<@${user.id}> no image no pets!`);
		}
		const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;

		const animatedGif = await petPetGif(avatarUrl, { resolution: 200 });
		const attachment = new MessageAttachment(
			animatedGif,
			"profile-image.gif"
		);
		msg.channel.send({
			content: `<@${user.id}> have some pets!`,
			files: [attachment],
		});
	}
});

client.login(process.env.CLIENT_TOKEN); //login bot using token
