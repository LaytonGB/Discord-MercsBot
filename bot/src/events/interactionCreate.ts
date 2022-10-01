import { CacheType, Client, Interaction } from "discord.js";

module.exports = {
  name: "interactionCreate",
  async execute(interaction: Interaction<CacheType>) {
    if (!interaction.isChatInputCommand()) return;

    const command = (interaction.client as Client<boolean> & { commands: any }).commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
  },
};