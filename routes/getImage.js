var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");

/* GET last uploaded image. */
router.get("/", function (req, res, next) {
    const imagesDir = path.join(__dirname, "../public/images");

    fs.readdir(imagesDir, function (err, files) {
        if (err) {
            return next(err);
        }

        const filesWithStats = files
            .map((file) => {
                const filePath = path.join(imagesDir, file);
                try {
                    const stats = fs.statSync(filePath);
                    // Only include files and exclude hidden files (starting with .)
                    if (stats.isFile() && !file.startsWith(".")) {
                        return { filePath, mtime: stats.mtime };
                    }
                } catch (e) {
                    // Ignore errors (e.g. file removed during processing)
                    return null;
                }
                return null; // Exclude directories or other types
            })
            .filter((item) => item !== null);

        if (filesWithStats.length === 0) {
            return res.status(404).send("No images found");
        }

        // Sort by modification time (descending)
        filesWithStats.sort((a, b) => b.mtime - a.mtime);

        const latestFilePath = filesWithStats[0].filePath;
        console.log("Sending file:", latestFilePath);
        res.sendFile(latestFilePath);
    });
});

module.exports = router;
