const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const ms = require('ms')
const math = require('mathjs')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-event')
        .setDescription('Create an event message.')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The title of the embed.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('The description of the embed.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('The time of the event such as 1d10m.')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to post into.')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, db) {

        try{
            if(await db.get("event-active") == true) {
                return interaction.reply({ content: "An event is already active." })
            }


            let date = ms(interaction.options.getString("time"))
            let cd = Date.now()

            let embed = new EmbedBuilder()
            .setTitle(interaction.options.getString("title"))
            .setDescription(interaction.options.getString("description"))
            .addFields(
                { name: "Time", value: `<t:${math.floor(math.add(cd, date) / 1000)}:F>`, inline: false },
                { name: "✅ Attending (0)", value: "> None", inline: true },
                { name: "❌ Not Attending (0)", value: "> None", inline: true },
                { name: "❔ Might Attend (0)", value: "> None", inline: true }
            )
            .setColor('#FFA500')

            const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('attending')
					.setLabel('Attending')
                    .setEmoji('✅')
					.setStyle(ButtonStyle.Success),
                new ButtonBuilder()
					.setCustomId('notattending')
					.setLabel('Not Attending')
                    .setEmoji('❌')
					.setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
					.setCustomId('mightattending')
					.setLabel('Might Attend')
                    .setEmoji('❔')
					.setStyle(ButtonStyle.Primary),
			);
    
            let msg = await (await interaction.guild.channels.fetch(interaction.options.getChannel("channel").id)).send({ embeds: [embed], components: [row] })
    
            interaction.reply({ content: "Event published." })

            
            db.set("event-active", true)
            db.set("event.timestamp", math.add(cd, date))
            db.set("event.chlid", interaction.options.getChannel("channel").id)
            db.set("event.attending", [])
            db.set("event.title", interaction.options.getString("title"))
            db.set("event.mightattending", [])
            db.set("event.notattending", [])
            db.set("event.msgid", msg.id)
        }catch(e){
            console.error(e)
            return interaction.reply({ content: "Command failed." })
        }
    },
};