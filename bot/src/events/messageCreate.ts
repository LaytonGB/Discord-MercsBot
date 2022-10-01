import { Client, Message } from "discord.js";

module.exports = {
  name: "messageCreate",
  async execute(rawMessage: Message) {
    if (rawMessage.author.bot) return;

    const msg = await rawMessage.fetch(true);
    const match = msg.content.match(/<t:\d{10}:\w>/);
    if (match?.length === 1) {
      msg.reply(match[0]);
    }
  },
};