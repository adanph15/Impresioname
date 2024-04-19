const db = require("../models");
const Lenses = db.lenses;
const Op = db.Sequelize.Op;
const path = require("path");
const fs = require('fs');

// Create Lenses
exports.create = (req, res) => {
    // Validate request
    if (!req.body.type || !req.body.article_id) {
        res.status(400).send({ message: 'Missing data' });
        return;
    }

    // Create a Lenses
    const lenses = {
        filename: req.file ? req.file.filename : "",
        type: req.body.type,
        article_id: req.body.article_id
    };

    // Save Lenses
    Lenses.create(lenses)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error saving lenses."
            });
        });
};

// Find All Lenses with a spesific Category
exports.findCategory = (req, res) => {
    const category = req.params.category;

    let condition = category ? { category: category } : null;

    Lenses.findAll({ where: condition })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: 'Error finding Lenses' });
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send({ message: 'Error finding Lenses' });
        });
};

// Find All Lenses
exports.findAll = (req, res) => {
    Lenses.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ message: 'Error finding Lenses' });
        });
};

// Find One Lenses
exports.findOne = (req, res) => {
    const id = req.params.id;
    Lenses.findByPk(id)
        .then(data => {
            if (!data) {
                res.send({
                    message: "Lenses not found."
                });
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            console.log('Error finding Lenses', error);
            res.status(500).send({ message: 'Error finding Lenses' });
        });
};

// Update One Lenses with ID
exports.update = (req, res) => {
    const id = req.params.id;
    const newFile = req.file;
    const newData = {
        article_id: req.body.article_id,
        type: req.body.type
    };

    Lenses.findByPk(id)
        .then(lenses => {
            if (lenses.filename) {
                const gltfPath = path.join(__dirname, '../public/glasses/lenses/', lenses.filename);
                fs.unlink(gltfPath, (err) => {
                    if (err) {
                        console.error('Error deleting gltf file:', err);
                    } else {
                        console.log('GLTF file deleted');
                    }
                });
            }
        }).catch(error => {
            console.error('Error finding Lenses:', error);
            res.status(500).send({ message: 'Error finding Lenses' });
        });
    if (newFile) {
        const newFilePath = path.join(__dirname, '../public/glasses/lenses/', newFile.filename);
        fs.rename(newFile.path, newFilePath, (err) => {
            if (err) {
                console.error('Error saving new gltf file:', err);
                res.status(500).send({ message: 'Error saving new gltf file' });
                return;
            }
            console.log('New GLTF file saved:', newFilePath);

            newData.filename = newFile.filename;

            Lenses.update(newData, { where: { id: id } })
                .then(num => {
                    if (num == 1) {
                        res.send({ message: "Lenses updated." });
                    } else {
                        res.send({ message: "Lenses cannot be updated." });
                    }
                })
                .catch(error => {
                    console.error('Error updating Lenses:', error);
                    res.status(500).send({ message: 'Error updating Lenses' });
                });
        });
    } else {
        Lenses.update(newData, { where: { id: id } })
            .then(num => {
                if (num == 1) {
                    res.send({ message: "Lenses updated." });
                } else {
                    res.send({ message: "Lenses cannot be updated." });
                }
            })
            .catch(error => {
                console.error('Error updating Lenses:', error);
                res.status(500).send({ message: 'Error updating Lenses' });
            });
    }
};

// Delete One Lenses with ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Lenses.findByPk(id)
        .then(lenses => {
            if (!lenses) {
                return res.status(404).send({ message: "Lenses not found." });
            }

            if (lenses.filename) {
                const imagePath = path.join(__dirname, '../public/glasses/lenses/', lenses.filename);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting gltf:', err);
                        return res.status(500).send({ message: 'Error deleting gltf' });
                    }
                    console.log('Gltf deleted');

                    Lenses.destroy({
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({ message: "Lenses deleted." });
                            } else {
                                res.status(500).send({ message: "Cannot delete Lenses." });
                            }
                        })
                        .catch(error => {
                            console.error('Error deleting Lenses:', error);
                            res.status(500).send({ message: 'Error deleting Lenses' });
                        });
                });
            } else {
                Lenses.destroy({
                    where: { id: id }
                })
                    .then(num => {
                        if (num == 1) {
                            res.send({ message: "Lenses deleted." });
                        } else {
                            res.status(500).send({ message: "Cannot delete Lenses." });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting Lenses:', error);
                        res.status(500).send({ message: 'Error deleting Lenses' });
                    });
            }
        })
        .catch(error => {
            console.error('Error finding Lenses:', error);
            res.status(500).send({ message: 'Error finding Lenses' });
        });
};
