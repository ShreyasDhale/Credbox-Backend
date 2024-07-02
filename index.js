require('./db/connection')
const express = require("express");
const appRouter = require("./routers/appLinks");
const app = express()
app.use(express.json())
const port = process.env.port || 3000

app.use(appRouter)

app.listen(port)
console.log("Server is running at " + port)