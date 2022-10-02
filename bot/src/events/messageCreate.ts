import { replyWithCalendarLinks, timestampRegex } from "../util";
import { Message } from "discord.js";

module.exports = {
  name: "messageCreate",
  async execute(rawMessage: Message) {
    if (rawMessage.author.bot) return;

    const msg = await rawMessage.fetch(true);
    const match = msg.content.match(timestampRegex);
    if (match?.length === 1) {
      replyWithCalendarLinks(msg, match);
    }
  },
};