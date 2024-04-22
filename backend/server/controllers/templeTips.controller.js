const db = require("../models");
const TempleTips = db.templeTips;
const Op = db.Sequelize.Op;
const path = require("path");
const fs = require('fs');

// Create TempleTips
exports.create = (req, res) => {
    // Validate request
    if (!req.body.article_id || !req.body.color) {
        res.status(400).send({ message: 'Missing data' });
        return;
    }

    // Create a TempleTips
    const templeTips = {
        filename: req.file ? req.file.filename : "",
        color: req.body.color,
        article_id: req.body.article_id
    };

    // Save TempleTips
    TempleTips.create(templeTips)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error saving templeTips."
            });
        });
};

// Find All TempleTips with a spesific Category
exports.findCategory = (req, res) => {
    const category = req.params.category;

    let condition = category ? { category: category } : null;

    TempleTips.findAll({ where: condition })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: 'Error finding TempleTips' });
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send({ message: 'Error finding TempleTips' });
        });
};

// Find All TempleTips
exports.findAll = (req, res) => {
    TempleTips.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ message: 'Error finding TempleTips' });
        });
};

// Find One TempleTips
exports.findOne = (req, res) => {
    const id = req.params.id;
    TempleTips.findByPk(id)
        .then(data => {
            if (!data) {
                res.send({
                    message: "TempleTips not found."
                });
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            console.log('Error finding TempleTips', error);
            res.status(500).send({ message: 'Error finding TempleTips' });
        });
};

// Update One TempleTips with ID
exports.update = (req, res) => {
    const id = req.params.id;
    const newFile = req.file;
    const newData = {
        color: req.body.color,
        article_id: req.body.article_id
    };

    TempleTips.findByPk(id)
        .then(templeTips => {
            if (templeTips.filename) {
                const gltfPath = path.join(__dirname, '../public/glasses/templeTips/', templeTips.filename);
                fs.unlink(gltfPath, (err) => {
                    if (err) {
                        console.error('Error deleting gltf file:', err);
                    } else {
                        console.log('GLTF file deleted');
                    }
                });
            }
        }).catch(error => {
            console.error('Error finding templeTips:', error);
            res.status(500).send({ message: 'Error finding templeTips' });
        });

    if (newFile) {
        const newFilePath = path.join(__dirname, '../public/glasses/templeTips/', newFile.filename);
        fs.rename(newFile.path, newFilePath, (err) => {
            if (err) {
                console.error('Error saving new gltf file:', err);
                res.status(500).send({ message: 'Error saving new gltf file' });
                return;
            }
            console.log('New GLTF file saved:', newFilePath);

            newData.filename = newFile.filename;

            TempleTips.update(newData, { where: { id: id } })
                .then(num => {
                    if (num == 1) {
                        res.send({ message: "TempleTips updated." });
                    } else {
                        res.send({ message: "TempleTips cannot be updated." });
                    }
                })
                .catch(error => {
                    console.error('Error updating templeTips:', error);
                    res.status(500).send({ message: 'Error updating templeTips' });
                });
        });
    } else {
        TempleTips.update(newData, { where: { id: id } })
            .then(num => {
                if (num == 1) {
                    res.send({ message: "TempleTips updated." });
                } else {
                    res.send({ message: "TempleTips cannot be updated." });
                }
            })
            .catch(error => {
                console.error('Error updating templeTips:', error);
                res.status(500).send({ message: 'Error updating templeTips' });
            });
    }
};

// Delete One Temple with ID
exports.delete = (req, res) => {
    const id = req.params.id;
    TempleTips.findByPk(id)
        .then(templeTips => {
            if (!templeTips) {
                return res.status(404).send({ message: "TempleTips not found." });
            }

            if (templeTips.filename) {
                const imagePath = path.join(__dirname, '../public/glasses/templeTips/', templeTips.filename);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting gltf:', err);
                        return res.status(500).send({ message: 'Error deleting gltf' });
                    }
                    console.log('Gltf deleted');

                    TempleTips.destroy({
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({ message: "TempleTips deleted." });
                            } else {
                                res.status(500).send({ message: "Cannot delete TempleTips." });
                            }
                        })
                        .catch(error => {
                            console.error('Error deleting TempleTips:', error);
                            res.status(500).send({ message: 'Error deleting TempleTips' });
                        });
                });
            } else {
                TempleTips.destroy({
                    where: { id: id }
                })
                    .then(num => {
                        if (num == 1) {
                            res.send({ message: "TempleTips deleted." });
                        } else {
                            res.status(500).send({ message: "Cannot delete TempleTips." });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting TempleTips:', error);
                        res.status(500).send({ message: 'Error deleting TempleTips' });
                    });
            }
        })
        .catch(error => {
            console.error('Error finding templeTips:', error);
            res.status(500).send({ message: 'Error finding templeTips' });
        });
};
