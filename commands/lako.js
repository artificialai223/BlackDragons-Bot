const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lako')
        .setDescription('This.'),
    async execute(interaction) {
        await interaction.reply('Lako fought in a PvP round, he got a KD of 0, (12 deaths, 0 kills)');
    },
};