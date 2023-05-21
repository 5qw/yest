const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, InteractionCollector } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Sends a random cat image.'),
  async execute(interaction) {
    try {
      const response = await axios.get('https://cataas.com/cat?json=true');
      const imageUrl = `https://cataas.com${response.data.url}`;

      const catEmoji = '😺';

      const catFactResponse = await axios.get('https://cat-fact.herokuapp.com/facts/random');
      const catFact = catFactResponse.data.text;

      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      const embed = new EmbedBuilder()
        .setColor(`#${randomColor}`)
        .setTitle('Random Cat')
        .setDescription(`${catFact} ${catEmoji}`)
        .setImage(imageUrl);

      const regenerateButton = new ButtonBuilder()
        .setCustomId('regenerate')
        .setLabel('Regenerate Image')
        .setStyle('1');

      const row = new ActionRowBuilder().addComponents(regenerateButton);

      const reply = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

      const filter = (i) => i.customId === 'regenerate' && i.user.id === interaction.user.id;
      const collector = new InteractionCollector(interaction.client, { filter, time: 10000 });

      collector.on('collect', async (i) => {
        try {
          const newResponse = await axios.get('https://cataas.com/cat?json=true');
          const newImageUrl = `https://cataas.com${newResponse.data.url}`;

          embed.setImage(newImageUrl);

          await i.update({ embeds: [embed] });
        } catch (error) {
          console.error(error);
          await i.reply('Failed to regenerate the image.\n If problem persist contact dev!');
        }
      });

      collector.on('end', () => {
        row.components.forEach((component) => {
          component.setDisabled(true);
        });

        reply.edit({ components: [row] }).catch(console.error);
      });
    } catch (error) {
      console.error(error);
      await interaction.reply('CatAPI failed, please wait and try again later.\n If problem persist contact dev!');
    }
  },
};
