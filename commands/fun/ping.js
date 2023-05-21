const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const timestamp = Date.now();
        const reply = await interaction.reply('🏓» Pong!');
        const latency = Date.now() - timestamp;
        const highLatencyThreshold = 200;
        const lowLatencyThreshold = 100;

        let message = '';
        if (latency >= highLatencyThreshold) {
            message = `🏓» Pong! Latency: ${latency}ms. The server response is slow.`;
        } else if (latency <= lowLatencyThreshold) {
            message = `🏓» Pong! Latency: ${latency}ms. The server response is fast.`;
        } else {
            message = `🏓» Pong! Latency: ${latency}ms.`;
        }

        await reply.edit(message);
    },
};
