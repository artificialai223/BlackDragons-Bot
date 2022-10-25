const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const noblox = require('noblox.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('BlackDragons roblox profile.')
        .addNumberOption(option =>
            option
            .setName("roblox-id")
            .setDescription("The roblox ID of the user. You can get the ID using bloxlink /whois.")
            .setRequired(true)
        ),
    async execute(interaction) {

        try{
            thumbnail_circHeadshot = await noblox.getPlayerThumbnail(interaction.options.getNumber("roblox-id"), 420, "png", true, "Headshot")
        }catch(e){await interaction.reply("That user doesnt exist!");}

        let username = await noblox.getUsernameFromId(interaction.options.getNumber("roblox-id"))

        badatgame = "No"

        if(username == "AKloFGo") badatgame = "Yes";

        let embed = new EmbedBuilder()
        .setAuthor({ iconURL: thumbnail_circHeadshot[0].imageUrl || undefined, name: username })
        .addFields(
            { name: "SEA Military Rank", value: await noblox.getRankNameInGroup(2648601, interaction.options.getNumber("roblox-id")), inline: true  },
            { name: "BlackDragons Rank", value: await noblox.getRankNameInGroup(15873427, interaction.options.getNumber("roblox-id")), inline: true  },
            { name: "Cant kill anything?", value: badatgame, inline: true  }
        )
        .setColor('#FFA500')

        await interaction.reply({ embeds: [embed] });
    },
};