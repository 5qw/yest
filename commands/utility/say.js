const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say something.')
    .addStringOption(option => option.setName('message').setDescription('The message to say').setRequired(true))
    .addChannelOption(option => option.setName('channel').setDescription('The channel to send the message').setRequired(false)),
  async execute(interaction) {
    const message = interaction.options.getString('message');
    const channelOption = interaction.options.getChannel('channel');
    const channel = channelOption || interaction.channel;

    await channel.send(message);
    await interaction.reply({ content: 'Message sent successfully!', ephemeral: true });
  },
};
