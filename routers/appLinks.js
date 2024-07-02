// appLinks.js

const express = require('express');
const AppInfo = require('../db/models/appLinks');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const upload = multer({
    limits: {
        fileSize: 100000000 // Limit file size to 100MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.apk$/)) {
            return cb(new Error('Only .apk files are allowed'));
        }
        cb(null, true);
    }
});

// upload file local path and version is required for this request
router.post('/uploads/apks/:version', upload.single('apk'), async (req, res) => {
    try {
        const version = req.params.version;

        // Check if file is uploaded
        if (!req.file) {
            throw new Error('File upload failed');
        }

        const filePath = req.file.path;
        console.log('File uploaded to:', filePath);

        const result = await AppInfo.uploadApk(version, filePath);
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send({ error: e.message });
        console.log("Error1", e);
    }
}, (err, req, res, next) => {
    res.status(400).send({ error: err.message });
    console.log("Error2", err);
});

module.exports = router;
