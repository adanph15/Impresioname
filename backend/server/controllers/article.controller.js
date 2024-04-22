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

    // Move image to the corresponding category folder
    moveImageToCategoryFolder(req, article.filename, article.category);

    // Save Article
    Article.create(article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error saving article."
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

    // Find the article by ID
    Article.findByPk(id)
        .then(article => {
            if (!article) {
                return res.status(404).send({ message: "Article not found." });
            }

            // Check if there's a new image and/or category
            const newFilename = req.file ? req.file.filename : article.filename; // Use existing filename if no new image is provided
            const newCategory = req.body.category ? req.body.category : article.category; // Use existing category if no new category is provided

            // Move the new image to the corresponding category folder if a new image is provided
            if (req.file) {
                moveImageToCategoryFolder(req, newFilename, newCategory);

                // Delete the old image if it exists
                if (article.filename) {
                    const oldCategoryFolder = getCategoryFolder(article.category);
                    const oldImagePath = path.join(__dirname, `../public/images/${oldCategoryFolder}/`, article.filename);

                    // Verify the existence of the file before attempting to delete it
                    fs.access(oldImagePath, fs.constants.F_OK, (err) => {
                        if (!err) {
                            fs.unlink(oldImagePath, (err) => {
                                if (err) {
                                    console.error('Error deleting old image:', err);
                                } else {
                                    console.log('Old image deleted');
                                }
                            });
                        } else {
                            console.log('Old image not found');
                        }
                    });
                }
            } else if (req.body.category && req.body.category !== article.category) {
                // Move the existing image to the new category folder if only category is updated
                const newCategoryFolder = getCategoryFolder(newCategory);
                const oldCategoryFolder = getCategoryFolder(article.category);
                const oldImagePath = path.join(__dirname, `../public/images/${oldCategoryFolder}/`, article.filename);
                const newImagePath = path.join(__dirname, `../public/images/${newCategoryFolder}/`, article.filename);

                // Move the image to the new category folder
                fs.rename(oldImagePath, newImagePath, (err) => {
                    if (err) {
                        console.error('Error moving image to new category folder:', err);
                    } else {
                        console.log('Image moved to new category folder');
                    }
                });
            }

            // Update the article data
            Article.update({
                name: req.body.name || article.name,
                description: req.body.description || article.description,
                price: req.body.price || article.price,
                category: newCategory,
                stock: req.body.stock || article.stock,
                filename: newFilename
            }, {
                where: { id: id }
            }).then(num => {
                console.log("Update result:", num);
                if (num == 1) {
                    res.send({ message: "Article updated." });
                } else {
                    res.send({ message: "Article cannot be updated." });
                }
            }).catch(error => {
                console.error('Error updating article:', error);
                res.status(500).send({ message: 'Error updating article' });
            });
        }).catch(error => {
            console.error('Error finding article:', error);
            res.status(500).send({ message: 'Error finding article' });
        });
};

// Function to move image to the corresponding category folder
function moveImageToCategoryFolder(req, filename, category) {
    if (!filename) return;

    const imagePath = path.join(__dirname, '../public/images/', filename);
    const categoryFolder = getCategoryFolder(category); // Define categoryFolder aquí

    const newImagePath = path.join(__dirname, `../public/images/${categoryFolder}/`, filename);

    // Move the image to the category folder
    fs.rename(imagePath, newImagePath, (err) => {
        if (err) {
            console.error('Error moving image to category folder:', err);
        } else {
            console.log('Image moved to category folder');
        }
    });
};

// Function to get the category folder name
function getCategoryFolder(category) {
    let categoryFolder = '';
    switch (category) {
        case 'kid':
            categoryFolder = 'kids';
            break;
        case 'men':
            categoryFolder = 'men';
            break;
        case 'women':
            categoryFolder = 'women';
            break;
        default:
            categoryFolder = 'other';
    }
    return categoryFolder;
}

// Delete One Article with ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Article.findByPk(id)
        .then(article => {
            if (article.filename) {
                const categoryFolder = getCategoryFolder(article.category);
                const imagePath = path.join(__dirname, `../public/images/${categoryFolder}/`, article.filename);
                
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image:', err);
                    } else {
                        console.log('Image deleted');
                    }
                });
            }
        }).catch(error => {
            console.error('Error finding article:', error);
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
            res.status(400).send({ message: 'Article cannot be deleted.' });
        }
    }).catch(error => {
        res.status(500).send({ message: 'Error deleting Article' });
    });
}; 
