const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Displays information about the bot.'),
  async execute(interaction) {
    const botName = interaction.client.user.username;
    const botAvatar = interaction.client.user.displayAvatarURL();
    const botBase = 'Discord.js v14.11.0';
    const botVersion = '1.0.0';
    const botAuthor = 'xyz#4261';

    const embed = new EmbedBuilder()
      .setColor('#7289DA')
      .setTitle(`Information about ${botName}`)
      .setThumbnail(botAvatar)
      .addFields(
        { name: 'Base', value: botBase },
        { name: 'Version', value: botVersion },
        { name: 'Developer', value: botAuthor },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
