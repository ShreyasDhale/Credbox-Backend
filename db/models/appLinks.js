// db/models/appLinks.js

const mongoose = require('mongoose');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '42824118438-ejdu3mg84ck9j5uq3b089bsoilbhkimk.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04uCmL8EQfmVqCgYIARAAGAQSNwF-L9Ir9n9_GI5XjwrqBCtD0ZhmMyG3YV0eDUh2dP2k3jGs7Chb0ounMIdENpcFy3ZrWmfZ7sM';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

const applinksSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    version: { type: String, required: true, trim: true },
    fileId: { type: String, unique: true, required: true },
    platformName: { type: String, default: 'Android' },
    downloadLink: { type: String, required: true }
}, { timestamps: true });

applinksSchema.statics.uploadApk = async function (version, filePath) {
    if (!filePath) {
        throw new Error('filePath is undefined');
    }

    const applinks = this;
    const fileName = path.basename(filePath).toString();
    console.log('File path:', filePath);
    console.log('File name:', fileName);

    try {
        const folderId = '1QUlCrYmJd4BgOkGENaJgJk2_jSxSRuCC';
        console.log('Starting the upload process...');

        const fileMetadata = {
            name: fileName,
            mimeType: 'application/vnd.android.package-archive',
            parents: [folderId]
        };

        const media = {
            mimeType: 'application/vnd.android.package-archive',
            body: fs.createReadStream(filePath)
        };

        const file = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id'
        });

        const fileId = file.data.id;
        console.log('File uploaded successfully, File ID:', fileId);

        const links = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        });

        console.log('Generated Links:', links.data.webContentLink);

        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        applinks.fileId = fileId;
        applinks.version = version;
        applinks.name = fileName;
        applinks.downloadLink = links.data.webContentLink;

        await applinks.save();

        console.log('Permissions set successfully. Process complete.');
    } catch (e) {
        console.log(e);
        return { error: 'something went wrong' };
    }

    return applinks;
};

const AppLinks = mongoose.model('applinks', applinksSchema);

module.exports = AppLinks;


// const bcrypt = require('bcryptjs');
// const validator = require('validator');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const Tasks = require('./tasks');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     age: {
//         type: Number,
//         required: true,
//         trim: true,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error("Age must not be negative");
//             }
//         }
//     },
//     email: {
//         type: String,
//         trim: true,
//         required: true,
//         unique: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error("Not in the format of email");
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 5,
//     },
//     tokens: [
//         {
//             token: {
//                 type: String,
//                 required: true
//             }
//         }
//     ],
//     avatar: {
//         type: Buffer,
//     }
// }, { timestamps: true });

// userSchema.virtual('tasks', {
//     ref: 'Tasks',
//     localField: '_id',
//     foreignField: 'owner'
// })

// userSchema.methods.toJSON = function () {
//     const user = this.toObject();
//     delete user.password;
//     delete user.tokens;
//     return user;
// };

// userSchema.statics.findByCredential = async function (email, password) {
//     const user = await this.findOne({ email });
//     if (!user) throw new Error("User not found");
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) throw new Error("Invalid Credentials");
//     return user;
// };

// userSchema.methods.generateAuthToken = async function () {
//     const user = this;
//     const token = jwt.sign({ _id: user._id.toString() }, 'thisismyprivatekey');
//     user.tokens = user.tokens.concat({ token });
//     await user.save();
//     return token;
// };

// userSchema.statics.encryptPassword = async function (password) {
//     return await bcrypt.hash(password, 8);
// };

// userSchema.statics.removeUser = async function (id) {
//     const user = await User.findByIdAndDelete(id)
//     if (!user) throw new Error('User Not found : 404');
//     await Tasks.deleteMany({ owner: id });
//     return user;
// }

// userSchema.pre('save', async function (next) {
//     const user = this;
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8);
//     }
//     next();
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
