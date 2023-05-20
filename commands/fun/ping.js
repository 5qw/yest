const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        // Get the current timestamp
        const timestamp = Date.now();

        // Reply with "Pong!" and calculate the latency
        const reply = await interaction.reply('🏓» Pong!');
        const latency = Date.now() - timestamp;

        // Define thresholds for high and low latency
        const highLatencyThreshold = 200; // in milliseconds
        const lowLatencyThreshold = 100; // in milliseconds

        // Check if latency is high or low and set the appropriate message
        let message = '';
        if (latency >= highLatencyThreshold) {
            message = `🏓» Pong! Latency: ${latency}ms. The server response is slow.`;
        } else if (latency <= lowLatencyThreshold) {
            message = `🏓» Pong! Latency: ${latency}ms. The server response is fast.`;
        } else {
            message = `🏓» Pong! Latency: ${latency}ms.`;
        }

        // Edit the original reply to include the appropriate message
        await reply.edit(message);
    },
};
