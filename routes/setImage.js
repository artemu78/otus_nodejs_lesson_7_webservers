var express = require("express");
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* POST new image. */
router.post('/', function (req, res, next) {
    const contentType = req.headers['content-type'];
    if (contentType && contentType.includes('multipart/form-data')) {
        return res.status(400).send('Error: Multipart form data not supported. Use curl --data-binary for raw upload.');
    }

    if (!req.headers['content-length'] || parseInt(req.headers['content-length']) === 0) {
        return res.status(400).send('Error: No file data received');
    }

    const fileName = 'image-' + Date.now() + '.jpg';
    const filePath = path.join(__dirname, '../public/images', fileName);
    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on('finish', () => {
        res.status(201).send('Image uploaded');
    });

    writeStream.on('error', (err) => {
        fs.unlink(filePath, () => { }); // Clean up
        next(err);
    });
});

module.exports = router;
