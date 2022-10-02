import { Message } from "discord.js";

const paramsToUrl = (params: { [key: string]: string }): string => {
  const s: string[] = [];
  for (const key in params) {
    s.push(`${key}=${params[key]}`);
  }
  return s.join("&");
};

module.exports = {
  name: "messageCreate",
  async execute(rawMessage: Message) {
    if (rawMessage.author.bot) return;

    const msg = await rawMessage.fetch(true);
    const match = msg.content.match(/(?<=session.*)<t:\d{10}:\w>/i);
    if (match?.length === 1) {
      const embed = match[0];
      const timestamp = embed.split(":")[1];
      msg.reply(`**Calendar Links for Session ${embed}**\n` +
        `https://laytongb.gitlab.io/discord-mercsbot?${paramsToUrl({ timestamp })}`);
    }
  },
};