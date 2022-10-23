const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const colors = require('colors')

const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

console.log('\n\n')
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

    if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
        console.log(command.data.name+" | "+colors.brightGreen('✔'))
	} else {
		console.log(command.data.name+" | "+colors.brightRed('✖')+"  (Missing execute or data)")
	}
}


const rest = new REST({ version: '10' }).setToken("NzU3MjA0ODUwNTE2OTUxMTAx.GxlDFj.BTxLmP98o1b6C21lUBpP24UlvYxgM90NOqEVPo");


(async () => {
	try {
        console.log('\n')
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(colors.brightYellow('⚠  ')+colors.brightGreen('Processing...'));

		const data = await rest.put(
			Routes.applicationGuildCommands("757204850516951101", "991342523454869564"),
			{ body: commands },
		);

        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(colors.brightGreen('✔  ')+colors.brightGreen('Commands updated'));
	} catch (error) {
		console.error(error);
	}
})();
