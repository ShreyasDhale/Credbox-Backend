require('./db/connection')
const express = require("express");
const appRouter = require("./routers/appLinks");
const app = express()
app.use(express.json())
const port = process.env.port || 3000

app.use(appRouter)

app.listen(port)
console.log("Server is running at " + port)

// Google drive setup

// const { google } = require('googleapis')
// const path = require('path')
// const fs = require('fs')

// const CLIENT_ID = '42824118438-ejdu3mg84ck9j5uq3b089bsoilbhkimk.apps.googleusercontent.com';
// const CLIENT_SECRET = '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';
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

// const REFRESH_TOKEN = '1//04uCmL8EQfmVqCgYIARAAGAQSNwF-L9Ir9n9_GI5XjwrqBCtD0ZhmMyG3YV0eDUh2dP2k3jGs7Chb0ounMIdENpcFy3ZrWmfZ7sM';

// const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const drive = google.drive({
//     version: 'v3',
//     auth: oauth2Client
// })

// const filePath = path.join(__dirname, 'index.js')

// async function uploadFile(filePath) {
//     try {
//         if (filePath.toString().endsWith(".apk")) {
//             const folderId = '1QUlCrYmJd4BgOkGENaJgJk2_jSxSRuCC';
//             console.log('Starting the upload process...');
//             const fileMetadata = {
//                 name: "Credbox/app.js",
//                 mimeType: "application/javascript",
//                 parents: [folderId]
//             };

//             const media = {
//                 mimeType: 'application/javascript',
//                 body: fs.createReadStream(filePath)
//             };

//             const file = await drive.files.create({
//                 requestBody: fileMetadata,
//                 media: media,
//                 fields: 'id'
//             });

//             const fileId = file.data.id;
//             console.log('File uploaded successfully, File ID : ', fileId);

//             const links = await drive.files.get({
//                 fileId: fileId,
//                 fields: 'webViewLink, webContentLink'
//             })
//             console.log('Generated Links : ', links.data.webContentLink);

//             await drive.permissions.create({
//                 fileId: fileId,
//                 requestBody: {
//                     role: "reader",
//                     type: "anyone"
//                 }
//             });

//             console.log('Permissions set successfully. Process complete.');
//         } else {
//             console.log("invalid file format only apk files allowed")
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }

// uploadFile(filePath);

// async function deleteFile(fileId) {
//     try {
//         const res = await drive.files.delete({
//             fileId: fileId
//         })
//         console.log(res)
//     } catch (e) {
//         console.log(e)
//     }
// }

// deleteFile()