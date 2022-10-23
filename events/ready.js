const { Events, EmbedBuilder } = require('discord.js');



let guildid = "1016714830847156314"

const Keyv = require('keyv');
const appRoot = require('app-root-path');
const db = new Keyv('sqlite://'+appRoot+'/data.sqlite');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        process.stdout.write(`\n\n\u001b[32;1mBot Online ✔\u001b[0m\n\n\u001b[34;1mBot Stats:\u001b[0m\n\nGuilds: \u001b[34;1m${client.guilds.cache.size}\u001b[0m\nUsers: \u001b[34;1m${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\u001b[0m\nChannels: \u001b[34;1m${client.channels.cache.size}\u001b[0m\n\n\u001b[34;1mProcess Stats:\u001b[0m\n\nType: \u001b[32;1mSleekCmd\u001b[0m\nIntents: \u001b[35;1m${client.intentlist.join(', ')}\u001b[0m\n`);

        setInterval(async function () {
            if(await db.get("event-active") == true) {
                if(await db.get("event.timestamp") <= Date.now()) {
                    await db.set("event-active", false)

                    let pplattend = await db.get("event.attending")

                    let chlid = await db.get("event.chlid")

                    let guild = await client.guilds.fetch(guildid)

                    let chl = await guild.channels.fetch(chlid);

                    let msg = await chl.messages.fetch(await db.get("event.msgid"))

                    msg.edit({ components: [] })

                    for (const person in pplattend) {
                        let id = pplattend[person]

                        try{
                            let usr = await guild.members.fetch(id)

                            await usr.send({ embeds: [
                                new EmbedBuilder()
                                .setTitle(await db.get("event.title")+" is starting!")
                                .setDescription("The event in BlackDragons is starting!")
                            ] })
                        }catch(e){
                            console.error(e)
                        }
                    }
                }
            }
        }, 1000)
    },
};