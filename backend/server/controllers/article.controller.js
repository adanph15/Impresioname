const db = require("../models");
const Article = db.article;
const Op = db.Sequelize.Op;
const path = require("path");
const fs = require('fs'); 

// Create Article
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name ||
        !req.body.description ||
        !req.body.price ||
        !req.body.category ||
        !req.body.stock) {
        res.status(400).send({ message: 'Missing data' });
        return;
    }

    // Create a Article
    const article = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        filename: req.file ? req.file.filename : ""
    };

    // Save Article
    Article.create(article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error saving article."
            });
        });
};

// Find All Articles with a spesific Category
exports.findCategory = (req, res) => {
    const category = req.params.category;

    let condition = category ? { category: category } : null;

    Article.findAll({ where: condition })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: 'Error finding Articles' });
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send({ message: 'Error finding Articles' });
        });
};

// Find All Articles
exports.findAll = (req, res) => {
    Article.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ message: 'Error finding Articles' });
        });
};

// Find One Article
exports.findOne = (req, res) => {
    const id = req.params.id;
    Article.findByPk(id)
        .then(data => {
            if (!data) {
                res.send({
                    message: "Article not found."
                });
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            console.log('Error finding Article', error);
            res.status(500).send({ message: 'Error finding Article' });
        });
};

// Update One Article with ID
exports.update = (req, res) => {
    const id = req.params.id;
    Article.findByPk(id)
    .then(article => {
        if (article.filename) {
            const imagePath = path.join(__dirname, '../public/images/', article.filename);
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting img');
                else { console.log('image deleted') };
            })
        }
    }).catch(error => {
        res.status(500).send({ message: 'Error finding article' });
    });


    Article.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Article updated."
            });
        } else {
            res.send({
                message: "Article cannot be updated."
            });
        }
    }).catch(error => {
        res.status(500).send({ message: 'Error updating article' });
    });
};

// Delete One Article with ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Article.findByPk(id)
        .then(article => {
            if (article.filename) {
                const imagePath = path.join(__dirname, '../public/images/', article.filename);
                fs.unlink(imagePath, (err) => {
                    if (err) console.error('Error deleting img');
                    else { console.log('image deleted') };
                })
            }
        }).catch(error => {
            res.status(500).send({ message: 'Error finding article' });
        });

    Article.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Article deleted."
            });
        } else {
            res.send({
                message: "Article cannot be deleted."
            });
        }
    }).catch(error => {
        res.status(500).send({ message: 'Error deleting Article' });
    });
}; 