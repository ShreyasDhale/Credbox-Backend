const mongoose = require('mongoose');

async function main() {
    const uri = "mongodb+srv://dartdev09:K0fbqmsPyyz4mGwh@cluster0.kwcmhsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri);
    console.log("Connected to the collection users");
}

main().catch(error => console.log(error));