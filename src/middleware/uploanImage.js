const multer = require('multer')
var admin = require("firebase-admin");
var serviceAccount = require("../../firebase-key.json");

const storage = multer({
    storage: multer.memoryStorage(),
    limits: 2048 * 2048
})

const BUCKET = "mdl-project-e7fa1.appspot.com"
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET
});


const upload = async (req, res, next) => {
    try {

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                storageBucket: BUCKET
            });
        }

        if (!req.file) return res.status(200).json({ msg: "" })

        //var now = moment().format("DD-MM-YYYY HH:mm:ss-A");
        const bucket = admin.storage().bucket();
        const img = req.file;
        const nameFile = Date.now() + '-' + img.originalname.split('.').pop();
        const file = bucket.file(nameFile);

        const stream = file.createWriteStream({
            metadata: {
                contentType: img.mimetype,
            }
        })

        let error = null;
        stream.on("error", (e) => {
            console.log(e)
            error = e
        })

        if (error) return res.status(400).json({
            msg: "error loading file",
            error: error
        })

        stream.on("finish", async () => {
            await file.makePublic();
            req.file.firebaseUrl = 'https://storage.googleapis.com/' + BUCKET + '/' + nameFile;
        })

        stream.end(img.buffer);
        req.urlFile = 'https://storage.googleapis.com/' + BUCKET + '/' + nameFile;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
}


module.exports = {
    storage,
    upload
}