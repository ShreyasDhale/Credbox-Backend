const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')

const CLIENT_ID = '42824118438-ejdu3mg84ck9j5uq3b089bsoilbhkimk.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04uCmL8EQfmVqCgYIARAAGAQSNwF-L9Ir9n9_GI5XjwrqBCtD0ZhmMyG3YV0eDUh2dP2k3jGs7Chb0ounMIdENpcFy3ZrWmfZ7sM';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filePath = path.join(__dirname, 'index.js')

async function uploadFile() {
    try {
        console.log(filePath)
        const res = await drive.files.create({
            requestBody: {
                name: "app.js",
                mimeType: "javascript/js"
            },
            media: {
                mimeType: 'javascript/js',
                body: fs.createReadStream(filePath)
            }
        })
        console.log(res.data)
    } catch (e) {
        console.log(e)
    }
}

// uploadFile()

async function deleteFile() {
    try {
        const res = await drive.files.delete({
            fileId: "1Z-jVTe_n_Nw6Uw6N2EjAg5LQzZRCiPc8"
        })
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

// deleteFile()

async function generatePublicUrl() {
    try {
        const fileId = '1_mbZoWJDDzF-tvn9nJAEGrzIhNdMKw_N';
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        })
        const result = await drive.files.get({
            fileId:fileId,
            fields:'webViewLink, webContentLink'
        })
        console.log(result.data)
    } catch (e) {
        console.log(e)
    }
}

generatePublicUrl()