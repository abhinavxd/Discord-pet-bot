require("dotenv").config();
const petPetGif = require("pet-pet-gif");
const { Client, Intents, MessageAttachment, User } = require("discord.js");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
	if (msg.content.startsWith("pet")) {
		let user;
		if (msg.mentions.users.first()) {
			user = msg.mentions.users.first();
		} else {
			user = msg.author;
		}
		const avatar = user.avatar;
		const id = user.id;
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
