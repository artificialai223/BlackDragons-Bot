const sleekcmd = require('sleekcmd')

sleekcmd.register({
    token: process.env.TOKEN || require('./config.json').token,
    guild_id: "991342523454869564",
    intents: ["Guilds"],
    client_id: "757204850516951101"
})