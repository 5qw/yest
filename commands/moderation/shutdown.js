const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Shutdown bot server.'),
    async execute(interaction) {
        const channel = interaction.client.channels.cache.get('1016293256109248512');
        const user = interaction.user;
        channel.send({
            content: `@${user.username} tried shutdown command L BOZO 💀\nbully him!`,
        });

        return interaction.reply({
            content: `Shutdown your life bozo 💀`,
            ephemeral: true,
        });
    },
};
