var multer = require('multer');
var path = require('path');

var templeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './server/public/glasses/temple');
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if (file.mimetype === 'model/gltf+json') {
            filetype = 'gltf';
        }
        cb(null, 'model-' + Date.now() + '.' + filetype);
    }
});

var templeTipsStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './server/public/glasses/templeTips');
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if (file.mimetype === 'model/gltf+json') {
            filetype = 'gltf';
        }
        cb(null, 'model-' + Date.now() + '.' + filetype);
    }
});

var frameStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './server/public/glasses/frame');
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if (file.mimetype === 'model/gltf+json') {
            filetype = 'gltf';
        }
        cb(null, 'model-' + Date.now() + '.' + filetype);
    }
});

var lensesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './server/public/glasses/lenses');
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if (file.mimetype === 'model/gltf+json') {
            filetype = 'gltf';
        }
        cb(null, 'model-' + Date.now() + '.' + filetype);
    }
});

var templeGltf = multer({ storage: templeStorage }).single('gltf');

var templeTipsGltf = multer({ storage: templeTipsStorage }).single('gltf');

var frameGltf = multer({ storage: frameStorage }).single('gltf');

var lensesGltf = multer({ storage: lensesStorage }).single('gltf');

module.exports = { templeGltf, templeTipsGltf, frameGltf, lensesGltf};
