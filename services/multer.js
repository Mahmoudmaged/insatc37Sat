const multer = require('multer')
const path = require("path")
const { nanoid } = require("nanoid")
const fs = require('fs')

const fileValdation = {
    image: ['image/jpeg', ' image/png'],
    pdf: ['apllication/pdf']
}
const HME = (err, req, res, next) => {
    if (err) {
        res.status(400).json({ message: "multer err", err })
    } else {
        next()
    }
}

function myMulter(customPath, customValidation) {
    try {
        if (!customPath) {
            customPath = 'general'
        }
        const fullPath = path.join(__dirname, `../uploads/${customPath}`)
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true })
        }
        const storage = multer.diskStorage({
    
            destination: function (req, file, cb) {
                req.finalDestination = `uploads/${customPath}`
                cb(null, fullPath)
            },
            filename: function (req, file, cb) {
                cb(null, nanoid() + "_" + file.originalname)
            }
        })
    
        const fileFilter = function (req, file, cb) {
    
            if (customValidation.includes(file.mimetype)) {
                cb(null, true)
            } else {
                req.fileErr = true
                cb(null, false)
            }
    
        }
        const upload = multer({ dest: fullPath, limits: { fileSize: 625000 }, fileFilter, storage })
        return upload
    } catch (error) {
        console.log('catch error ' , err);
    }
   
}

module.exports = {
    myMulter,
    fileValdation,
    HME
}