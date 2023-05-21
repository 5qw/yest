const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get the avatar URL of the selected user, or your own avatar.')
    .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
  async execute(interaction) {
    const user = interaction.options.getUser('target');
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const embed = new EmbedBuilder()
      .setColor(`#${randomColor}`);

    if (user) {
      embed.setTitle(`${user.username}'s avatar`);
      embed.setImage(user.displayAvatarURL({ dynamic: true }));
    } else {
      embed.setTitle('Your avatar');
      embed.setImage(interaction.user.displayAvatarURL({ dynamic: true }));
    }

    return interaction.reply({ embeds: [embed] });
  },
};
