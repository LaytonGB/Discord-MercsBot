import { Message } from "discord.js";

export const timestampRegex = /(?<=session.*)<t:\d{10}:\w>/i;

export const paramsToUrl = (params: { [key: string]: string }): string => {
  const s: string[] = [];
  for (const key in params) {
    s.push(`${key}=${params[key]}`);
  }
  return s.join("&");
};

export const replyWithCalendarLinks = (msg: Message<boolean>, match: RegExpMatchArray) => {
  const embed = match[0];
  const timestamp = embed.split(":")[1];
  msg.reply(`**Calendar Links for Session ${embed}**\n` +
    `https://laytongb.gitlab.io/discord-mercsbot?${paramsToUrl({ timestamp })}`);
};