const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Sends a random cat image.'),
  async execute(interaction) {
    try {
      //const catImageResponse = await axios.get('https://api.thecatapi.com/v1/images/search');
      //const imageUrl = catImageResponse.data[0].url;
      const response = await axios.get('https://cataas.com/cat?json=true');
      const imageUrl = `https://cataas.com${response.data.url}`;


      const catEmoji = '😺';

      const catFactResponse = await axios.get('https://cat-fact.herokuapp.com/facts/random');
      const catFact = catFactResponse.data.text;

      await interaction.reply(`${catFact} ${catEmoji}\n${imageUrl}`);
    } catch (error) {
      console.error(error);
      await interaction.reply('Failed to fetch a random cat image and fact.');
    }
  },
};
