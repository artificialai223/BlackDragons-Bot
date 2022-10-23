const { Events } = require('discord.js');
const Keyv = require('keyv');
const appRoot = require('app-root-path');
const db = new Keyv('sqlite://'+appRoot+'/data.sqlite');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
        
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            
            try {
                await command.execute(interaction, db);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
            }
        };

        if(interaction.isButton()) {
            if(interaction.message.id == await db.get('event.msgid')) {
                if(interaction.customId == "attending") {
                    let attending = await db.get('event.attending')
                    let attending2 = await db.get('event.mightattending')
                    let attending3 = await db.get('event.notattending')

                    if(attending.includes(interaction.user.id) == false) attending.push(interaction.user.id);

                    if(attending2.includes(interaction.user.id)) {
                        const index = attending2.indexOf(interaction.user.id);
                        if (index > -1) {
                            attending2.splice(index, 1);
                        }
                        await db.set('event.mightattending', attending2)
                    }
                    if(attending3.includes(interaction.user.id)) {
                        const index = attending3.indexOf(interaction.user.id);
                        if (index > -1) {
                            attending3.splice(index, 1);
                        }
                        await db.set('event.notattending', attending3)
                    }

                    await db.set('event.attending', attending)

                    let string = ""

                    for(const usr in attending) {
                        let usr2 = attending[usr]

                        let usr3 = await interaction.client.users.fetch(usr2);

                        if(string.length == 0) {
                            string = `> ${usr3.tag}`
                        }else{
                            string = string+`\n> ${usr3.tag}`
                        }
                    }

                    let string2 = ""

                    for(const usr in attending2) {
                        let usr2 = attending2[usr]

                        let usr3 = await interaction.client.users.fetch(usr2);

                        if(string2.length == 0) {
                            string2 = `> ${usr3.tag}`
                        }else{
                            string2 = string2+`\n> ${usr3.tag}`
                        }
                    }

                    let string3 = ""

                    for(const usr in attending3) {
                        let usr2 = attending3[usr]

                        let usr3 = await interaction.client.users.fetch(usr2);

                        if(string3.length == 0) {
                            string3 = `> ${usr3.tag}`
                        }else{
                            string3 = string2+`\n> ${usr3.tag}`
                        }
                    }

                    if(string3 == "") string3 = "> None";
                    if(string2 == "") string2 = "> None";
                    if(string == "") string = "> None";

                    const embed = interaction.message.embeds[0] // Get the embed that you want to edit.
                    embed.fields[3] = {name : '❔ Might Attend ('+attending2.length+')' , value : string2, inline : true}
                    embed.fields[1] = {name : '✅ Attending ('+attending.length+')' , value : string, inline : true}
                    embed.fields[2] = {name : '❌ Not Attending ('+attending3.length+')' , value : string3, inline : true}

                    await interaction.update({ embeds: [embed] });
                }
                if(interaction.customId == "notattending") {
                    let attending = await db.get('event.notattending')
                    let attending2 = await db.get('event.attending')
                    let attending3 = await db.get('event.mightattending')

                    if(attending.includes(interaction.user.id) == false) attending.push(interaction.user.id);

                    if(attending2.includes(interaction.user.id)) {
                        const index = attending2.indexOf(interaction.user.id);
                        if (index > -1) {
                            attending2.splice(index, 1);
                        }
                        await db.set('event.attending', attending2)
                    }
                    if(attending3.includes(interaction.user.id)) {
                        const index = attending3.indexOf(interaction.user.id);
                        if (index > -1) {
                            attending3.splice(index, 1);
                        }
                        await db.set('event.mightattending', attending3)
                    }

                    await db.set('event.notattending', attending)

                    let string = ""

                    for(const usr in attending) {
                        let usr2 = attending[usr]

                        let usr3 = await interaction.client.users.fetch(usr2);

                        if(string.length == 0) {
                            string = `> ${usr3.tag}`
                        }else{
                            string = string+`\n> ${usr3.tag}`
                        }
                    }

                    let string2 = ""

                    for(const usr in attending2) {
                        let usr2 = attending2[usr]

                        let usr3 = await interaction.client.users.fetch(usr2);

                        if(string2.length == 0) {
                            string2 = `> ${usr3.tag}`
                        }else{
                            string2 = string2+`\n> ${usr3.tag}`
                        }
                    }

                    let string3 = ""

                    for(const usr in attending3) {
                        let usr2 = attending3[usr]

                        let usr3 = await interaction.client.users.fetch(usr2);

                        if(string3.length == 0) {
                            string3 = `> ${usr3.tag}`
                        }else{
                            string3 = string2+`\n> ${usr3.tag}`
                        }
                    }

                    if(string3 == "") string3 = "> None";
                    if(string2 == "") string2 = "> None";
                    if(string == "") string = "> None";

                    const embed = interaction.message.embeds[0] // Get the embed that you want to edit.
                    embed.fields[3] = {name : '❔ Might Attend ('+attending3.length+')' , value : string3, inline : true}
                    embed.fields[1] = {name : '✅ Attending ('+attending2.length+')' , value : string2, inline : true}
                    embed.fields[2] = {name : '❌ Not Attending ('+attending.length+')' , value : string, inline : true}

                    await interaction.update({ embeds: [embed] });
                }
                if(interaction.customId == "mightattending") {
                    let attending = await db.get('event.mightattending')
                    let attending2 = await db.get('event.attending')
                    let attending3 = await db.get('event.notattending')

                    if(attending.includes(interaction.user.id) == false) attending.push(interaction.user.id);

                    if(attending2.includes(interaction.user.id)) {
                        const index = attending2.indexOf(interaction.user.id);
                        if (index > -1) {
                            attending2.splice(index, 1);
                        }
                        await db.set('event.attending', attending2)
                    }
                    if(attending3.includes(interaction.user.id)) {
                        const index = attending3.indexOf(interaction.user.id);
                        if (index > -1) {
                            attending3.splice(index, 1);
                        }
                        await db.set('event.notattending', attending3)
                    }

                    await db.set('event.mightattending', attending)

                    let string = ""

                    for(const usr in attending) {
                        let usr2 = attending[usr]

                        let usr3 = await interaction.client.users.fetch(usr2);

                        if(string.length == 0) {
                            string = `> ${usr3.tag}`
                        }else{
                            string = string+`\n> ${usr3.tag}`
                        }
                    }

                    let string2 = ""

                    for(const usr in attending2) {
                        let usr2 = attending2[usr]

                        let usr3 = await interaction.client.users.fetch(usr2);

                        if(string2.length == 0) {
                            string2 = `> ${usr3.tag}`
                        }else{
                            string2 = string2+`\n> ${usr3.tag}`
                        }
                    }

                    let string3 = ""

                    for(const usr in attending3) {
                        let usr2 = attending3[usr]

                        let usr3 = await interaction.client.users.fetch(usr2);

                        if(string3.length == 0) {
                            string3 = `> ${usr3.tag}`
                        }else{
                            string3 = string2+`\n> ${usr3.tag}`
                        }
                    }

                    if(string3 == "") string3 = "> None";
                    if(string2 == "") string2 = "> None";
                    if(string == "") string = "> None";

                    const embed = interaction.message.embeds[0] // Get the embed that you want to edit.
                    embed.fields[3] = {name : '❔ Might Attend ('+attending.length+')' , value : string, inline : true}
                    embed.fields[1] = {name : '✅ Attending ('+attending2.length+')' , value : string2, inline : true}
                    embed.fields[2] = {name : '❌ Not Attending ('+attending3.length+')' , value : string3, inline : true}

                    await interaction.update({ embeds: [embed] });
                }
            }
        }
    },
};