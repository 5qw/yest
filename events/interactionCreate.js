const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const { commandName, channel } = interaction;
    const command = interaction.client.commands.get(commandName);

    if (!command) return;

    const allowedChannelIds = ['1033339039694213210'];

    if (!allowedChannelIds.includes(channel.id)) {
      const mentionedChannel = interaction.guild.channels.cache.get('1033339039694213210');
      await interaction.reply({
        content: `Please commands must be executed on ${mentionedChannel}.`,
        ephemeral: true,
      });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${commandName}`);
      console.error(error);
      await interaction.reply({
        content: 'An error occurred while executing the command.',
        ephemeral: true,
      });
    }
  },
};
