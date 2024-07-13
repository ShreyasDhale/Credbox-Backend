require('./db/connection')
const express = require("express");
const appRouter = require("./routers/appLinks");
const userRouter = require("./routers/usersRouter");
const checkNetworkConnectivity = require("./middleware/CheckNetwork");
const app = express()
app.use(express.json())
app.use(checkNetworkConnectivity);

app.use(appRouter)
app.use(userRouter)

const port = process.env.port || 3000

const server = app.listen(port)
console.log("Server is running at " + port)

const io = require('socket.io')(server)
io.on('connection',(socket)=>{
    console.log('Connected Successfully ',socket.id);
})