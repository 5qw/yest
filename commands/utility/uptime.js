const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Displays the uptime of the bot'),
    async execute(interaction) {
        // Get the uptime of the Node.js process
        const uptime = process.uptime();

        // Format the uptime into a human-readable string excluding zero values
        const formattedUptime = formatUptime(uptime);

        // Reply with the uptime
        await interaction.reply(`⏳» Time since last reboot: ${formattedUptime}`);
    },
};

// Helper function to format the uptime into a human-readable string excluding zero values
function formatUptime(uptime) {
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));

    let formattedString = '';

    if (days > 0) {
        formattedString += `${days}d `;
    }
    if (hours > 0) {
        formattedString += `${hours}h `;
    }
    if (minutes > 0) {
        formattedString += `${minutes}m `;
    }
    if (seconds > 0) {
        formattedString += `${seconds}s`;
    }

    return formattedString.trim();
}
