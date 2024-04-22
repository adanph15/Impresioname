var multer = require('multer');
var path = require('path');

var imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './server/public/images');
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var uploadImage = multer({ storage: imageStorage }).single('image');

module.exports = { uploadImage };
