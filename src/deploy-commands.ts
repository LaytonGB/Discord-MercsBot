import { REST, SlashCommandBuilder, Routes } from 'discord.js';
import { clientId, token } from './config.json';

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
  new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
  .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
  .then((data) => console.log(`Successfully registered ${(data as { length: number }).length} application commands.`))
  .catch(console.error);