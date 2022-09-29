import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription('Replies with Pong!'),
  // doNotList: true,
  async execute(interaction/* : Interaction<CacheType> */) { //! uncomment when can
    // if (interaction.type) //! maybe we need to do something here?
    const msg = await interaction.reply({ content: 'Pong!', fetchReply: true });
    msg.edit("Pong! " + new Date(Date.now() - msg.createdAt.getMilliseconds()).getMilliseconds() + "ms");
  },
};