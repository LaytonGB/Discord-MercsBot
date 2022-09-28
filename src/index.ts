// Require the necessary discord.js classes
import { Client, GatewayIntentBits } from 'discord.js';
import { token } from './config.json';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    const msg = await interaction.reply({ content: 'Pong!', fetchReply: true });
    msg.edit("Pong! " + new Date(Date.now() - msg.createdAt.getMilliseconds()).getMilliseconds() + "ms");
  } else if (commandName === 'server') {
    await interaction.reply('Server info.');
  } else if (commandName === 'user') {
    await interaction.reply('User info.');
  }
});

// Login to Discord with your client's token
client.login(token);