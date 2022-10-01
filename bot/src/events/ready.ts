import { Client } from "discord.js";

module.exports = {
  name: "ready",
  once: true,
  execute(client: Client<true>) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};