const sleekcmd = require('sleekcmd')

sleekcmd.register({
    token: process.env.TOKEN,
    guild_id: "991342523454869564",
    intents: ["Guilds"],
    client_id: "757204850516951101"
})

const express = require('express')

const app = express()

app.get('/', (req,res) => {
    res.json({ status: "Online" })
})

app.listen(80)