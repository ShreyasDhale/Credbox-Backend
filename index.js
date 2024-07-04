require('./db/connection')
const express = require("express");
const appRouter = require("./routers/appLinks");
const userRouter = require("./routers/usersRouter");
const app = express()
app.use(express.json())

app.use(appRouter)
app.use(userRouter)

const port = process.env.port || 3000

app.listen(port)
console.log("Server is running at " + port)