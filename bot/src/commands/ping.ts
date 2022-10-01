import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  // doNotList: true,
  async execute(interaction: Interaction<CacheType>) {
    if (interaction.type === 4) return;
    const msg = await interaction.reply({ content: "Pong!", fetchReply: true });
    if (msg.inGuild() && msg.guild) { // TODO remove the need for this
      msg.edit("Pong! " + new Date(Date.now() - msg.createdAt.getMilliseconds()).getMilliseconds() + "ms");
    }
  },
};