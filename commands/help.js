const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('The information command.'),
    async execute(interaction) {
        let embed = new EmbedBuilder()
        .setTitle('BlackDragons Bot')
        .setDescription('The commands are all listed by clicking `/`.')
        .setFooter({ iconURL: "https://henry-walter.com/assets/images/AREmoji_20221103_153510.jpg", text: "Created by ArtificialAI#0001" })
        .setColor('#FFA500')

        interaction.reply({ embeds: [embed] })
    },
};