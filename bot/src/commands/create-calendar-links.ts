import { replyWithCalendarLinks, timestampRegex } from "../util";
import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-calendar-links")
    .setDescription("Tries to find the last session announcement and post calendar links."),
  async execute(interaction: Interaction<CacheType>) {
    const channel = interaction.channel;
    const messages = await channel?.messages.fetch({ limit: 10 });
    if (!messages) return;
    for (const [, msg] of messages) {
      if (!msg.inGuild()) return;
      const match = msg.content.match(timestampRegex);
      if (match?.length === 1) {
        replyWithCalendarLinks(msg, match);
        if (interaction.type !== 4) {
          interaction.reply({ content: "Post found, links created!", fetchReply: true, ephemeral: true });
        }
        return;
      }
    }
  },
};