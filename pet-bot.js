require('dotenv').config();
const petPetGif = require('pet-pet-gif')
const { Client, Intents, MessageAttachment } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (msg.content === 'pet') {
        const avatar = msg.author.avatar, id = msg.author.id;
        const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
        const animatedGif = await petPetGif(avatarUrl, { resolution: 200, })
        const attachment = new MessageAttachment(animatedGif, 'profile-image.gif');
        msg.reply({ files: [attachment] });
    }
});

client.login(process.env.CLIENT_TOKEN); //login bot using token