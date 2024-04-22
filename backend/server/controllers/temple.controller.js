const db = require("../models");
const Temple = db.temple;
const Op = db.Sequelize.Op;
const path = require("path");
const fs = require('fs');

// Create Temple
exports.create = (req, res) => {
    // Validate request
    if (!req.body.article_id || !req.body.color) {
        res.status(400).send({ message: 'Missing data' });
        return;
    }

    // Create a Temple
    const temple = {
        filename: req.file ? req.file.filename : "",
        color: req.body.color,
        article_id: req.body.article_id
    };

    // Save Temple
    Temple.create(temple)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error saving temple."
            });
        });
};

// Find All Temples with a spesific Category
exports.findCategory = (req, res) => {
    const category = req.params.category;

    let condition = category ? { category: category } : null;

    Temple.findAll({ where: condition })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: 'Error finding Temples' });
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send({ message: 'Error finding Temples' });
        });
};

// Find All Temples
exports.findAll = (req, res) => {
    Temple.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ message: 'Error finding Temples' });
        });
};

// Find One Temple
exports.findOne = (req, res) => {
    const id = req.params.id;
    Temple.findByPk(id)
        .then(data => {
            if (!data) {
                res.send({
                    message: "Temple not found."
                });
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            console.log('Error finding Temple', error);
            res.status(500).send({ message: 'Error finding Temple' });
        });
};

// Update One Temple with ID
exports.update = (req, res) => {
    const id = req.params.id;
    const newFile = req.file;
    const newData = {
        color: req.body.color,
        article_id: req.body.article_id
    };

    Temple.findByPk(id)
        .then(temple => {
            if (temple.filename) {
                const gltfPath = path.join(__dirname, '../public/glasses/temple/', temple.filename);
                fs.unlink(gltfPath, (err) => {
                    if (err) {
                        console.error('Error deleting gltf file:', err);
                    } else {
                        console.log('GLTF file deleted');
                    }
                });
            }
        }).catch(error => {
            console.error('Error finding temple:', error);
            res.status(500).send({ message: 'Error finding temple' });
        });

    if (newFile) {
        const newFilePath = path.join(__dirname, '../public/glasses/temple/', newFile.filename);
        fs.rename(newFile.path, newFilePath, (err) => {
            if (err) {
                console.error('Error saving new gltf file:', err);
                res.status(500).send({ message: 'Error saving new gltf file' });
                return;
            }
            console.log('New GLTF file saved:', newFilePath);

            newData.filename = newFile.filename;

            Temple.update(newData, { where: { id: id } })
                .then(num => {
                    if (num == 1) {
                        res.send({ message: "Temple updated." });
                    } else {
                        res.send({ message: "Temple cannot be updated." });
                    }
                })
                .catch(error => {
                    console.error('Error updating temple:', error);
                    res.status(500).send({ message: 'Error updating temple' });
                });
        });
    } else {
        Temple.update(newData, { where: { id: id } })
            .then(num => {
                if (num == 1) {
                    res.send({ message: "Temple updated." });
                } else {
                    res.send({ message: "Temple cannot be updated." });
                }
            })
            .catch(error => {
                console.error('Error updating temple:', error);
                res.status(500).send({ message: 'Error updating temple' });
            });
    }
};

// Delete One Temple with ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Temple.findByPk(id)
        .then(temple => {
            if (!temple) {
                return res.status(404).send({ message: "Temple not found." });
            }

            if (temple.filename) {
                const imagePath = path.join(__dirname, '../public/glasses/temple/', temple.filename);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting gltf:', err);
                        return res.status(500).send({ message: 'Error deleting gltf' });
                    }
                    console.log('Gltf deleted');

                    Temple.destroy({
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({ message: "Temple deleted." });
                            } else {
                                res.status(500).send({ message: "Cannot delete Temple." });
                            }
                        })
                        .catch(error => {
                            console.error('Error deleting Temple:', error);
                            res.status(500).send({ message: 'Error deleting Temple' });
                        });
                });
            } else {
                Temple.destroy({
                    where: { id: id }
                })
                    .then(num => {
                        if (num == 1) {
                            res.send({ message: "Temple deleted." });
                        } else {
                            res.status(500).send({ message: "Cannot delete Temple." });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting Temple:', error);
                        res.status(500).send({ message: 'Error deleting Temple' });
                    });
            }
        })
        .catch(error => {
            console.error('Error finding temple:', error);
            res.status(500).send({ message: 'Error finding temple' });
        });
};
