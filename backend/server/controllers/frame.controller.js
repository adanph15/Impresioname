const db = require("../models");
const Frame = db.frame;
const Op = db.Sequelize.Op;
const path = require("path");
const fs = require('fs');

// Create Frame
exports.create = (req, res) => {
    // Validate request
    if (!req.body.color || !req.body.article_id) {
        res.status(400).send({ message: 'Missing data' });
        return;
    }

    // Create a Frame
    const frame = {
        filename: req.file ? req.file.filename : "",
        color: req.body.color,
        article_id: req.body.article_id,
    };

    // Save Frame
    Frame.create(frame)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error saving frame."
            });
        });
};

// Find All Articles with a spesific Category
exports.findCategory = (req, res) => {
    const category = req.params.category;

    let condition = category ? { category: category } : null;

    Frame.findAll({ where: condition })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: 'Error finding Frames' });
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send({ message: 'Error finding Frames' });
        });
};

// Find All Frames
exports.findAll = (req, res) => {
    Frame.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ message: 'Error finding Frames' });
        });
};

// Find One Frame
exports.findOne = (req, res) => {
    const id = req.params.id;
    Frame.findByPk(id)
        .then(data => {
            if (!data) {
                res.send({
                    message: "Frame not found."
                });
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            console.log('Error finding Frame', error);
            res.status(500).send({ message: 'Error finding Frame' });
        });
};

// Update One Frame with ID
exports.update = (req, res) => {
    const id = req.params.id;
    const newFile = req.file;
    const newData = {
        color: req.body.color,
        article_id: req.body.article_id
    };

    Frame.findByPk(id)
        .then(frame => {
            if (frame.filename) {
                const gltfPath = path.join(__dirname, '../public/glasses/frame/', frame.filename);
                fs.unlink(gltfPath, (err) => {
                    if (err) {
                        console.error('Error deleting gltf file:', err);
                    } else {
                        console.log('GLTF file deleted');
                    }
                });
            }
        }).catch(error => {
            console.error('Error finding frame:', error);
            res.status(500).send({ message: 'Error finding frame' });
        });

    if (newFile) {
        const newFilePath = path.join(__dirname, '../public/glasses/frame/', newFile.filename);
        fs.rename(newFile.path, newFilePath, (err) => {
            if (err) {
                console.error('Error saving new gltf file:', err);
                res.status(500).send({ message: 'Error saving new gltf file' });
                return;
            }
            console.log('New GLTF file saved:', newFilePath);

            newData.filename = newFile.filename;

            Frame.update(newData, { where: { id: id } })
                .then(num => {
                    if (num == 1) {
                        res.send({ message: "Frame updated." });
                    } else {
                        res.send({ message: "Frame cannot be updated." });
                    }
                })
                .catch(error => {
                    console.error('Error updating Frame:', error);
                    res.status(500).send({ message: 'Error updating Frame' });
                });
        });
    } else {
        Frame.update(newData, { where: { id: id } })
            .then(num => {
                if (num == 1) {
                    res.send({ message: "Frame updated." });
                } else {
                    res.send({ message: "Frame cannot be updated." });
                }
            })
            .catch(error => {
                console.error('Error updating Frame:', error);
                res.status(500).send({ message: 'Error updating Frame' });
            });
    }
};

// Delete One Frame with ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Frame.findByPk(id)
        .then(frame => {
            if (!frame) {
                return res.status(404).send({ message: "Frame not found." });
            }

            if (frame.filename) {
                const imagePath = path.join(__dirname, '../public/glasses/frame/', frame.filename);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting gltf:', err);
                        return res.status(500).send({ message: 'Error deleting gltf' });
                    }
                    console.log('Gltf deleted');

                    Frame.destroy({
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({ message: "Frame deleted." });
                            } else {
                                res.status(500).send({ message: "Cannot delete Frame." });
                            }
                        })
                        .catch(error => {
                            console.error('Error deleting Frame:', error);
                            res.status(500).send({ message: 'Error deleting Frame' });
                        });
                });
            } else {
                Frame.destroy({
                    where: { id: id }
                })
                    .then(num => {
                        if (num == 1) {
                            res.send({ message: "Frame deleted." });
                        } else {
                            res.status(500).send({ message: "Cannot delete Frame." });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting Frame:', error);
                        res.status(500).send({ message: 'Error deleting Frame' });
                    });
            }
        })
        .catch(error => {
            console.error('Error finding Frame:', error);
            res.status(500).send({ message: 'Error finding Frame' });
        });
};
