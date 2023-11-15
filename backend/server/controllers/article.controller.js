const db = require("../models");
const Article = db.article;
const Op = db.Sequelize.Op;
const path = require("path");

// Create Article
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || 
        !req.body.description || 
        !req.body.price || 
        !req.body.category || 
        !req.body.stock ) {
        return console.log('Missing data');
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
        .catch(console.log('Error saving article'));
};

// // Find All Articles
exports.findAll = (req, res) => {
    const category = req.params.category;

    let condition = category ? { category: category } : null;

    Article.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            console.log('Error finding Articles:', error);
            res.status(500).send({ message: 'Error finding Articles' });
        });
};

// Find One Article
exports.findOne = (req, res) => {
    const id = req.params.id;
    Article.findByPk(id)
        .then(data => {
            if (!data) {
                console.log('Article not found');
            } else {
                res.send(data);
            }
        })
        .catch(console.log('Error finding article'));
};

// Update One Article with ID
exports.update = (req, res) => {
    const id = req.params.id;
    Article.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            console.log('Article updated')
        } else {
            console.log('Article cannot be deleted')
        }
    }).catch(console.log('Error updating the article'));
};

// Delete One Article with ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Article.findByPk(id)
        .then(article => {
            if (!article) {
                console.log('Article not found');
            } else {
                article.destroy().then(() => {
                    const thisDir = path.dirname(__filename);
                    const imagePath = path.join(thisDir, '../public/images', article.filename);
                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error('Error')
                        }
                    })
                    res.send(console.log("Article deleted"));
                })
            }
        }).catch(console.log('Error updating the article'));
};