const mongoose = require('mongoose');
const User = require('./models/users');

async function main() {
    const uri = "mongodb+srv://credboxdevelopment:0YoKvSM5h98Tzc4H@credbox-cluster0.exqtrdu.mongodb.net/Credbox?retryWrites=true&w=majority&appName=Credbox-Cluster0";
    await mongoose.connect(uri);
    console.log("Connected to the collection Credbox");
}

main().catch(error => console.log(error));