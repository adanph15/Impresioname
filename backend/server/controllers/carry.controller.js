const db = require("../models");
const Carry = db.carry;
const Op = db.Sequelize.Op;

// Create Carry
exports.create = (req, res) => {
    // Validate request
    if (!req.body.article_id || 
        !req.body.purchase_id) {
            res.status(400).send({ message: 'Missing data' });
            return;
    }

    // Create a Carry
    const carry = {
        article_id: req.body.article_id,
        purchase_id: req.body.purchase_id
    };

    // Save Carry
    Carry.create(carry)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error saving carry."
            });
        });
};

exports.findByPurchaseId = (req, res) => {
    const purchaseId = req.params.purchaseId;
    let condition = purchaseId ? { purchase_id: purchaseId } : null;

    Carry.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message ||  "Error finding carries."
        });
    });
};

exports.findByArticleId = (req, res) => {
    const articleId = req.params.articleId;

    Carry.findAll({ where: { article_id: articleId } })
    .then(data => {
        if (!data) {
            res.status(400).send({
                message: "Carry not article id :", articleId
            });
        } else {
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message ||  "Error finding carries.,,,  article id :", articleId
        });
    });
};

// Find All Deliveries
exports.findAll = (req, res) => {
    Carry.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error finding carries."
            });
        });
};

// Find One Carry
// exports.findOne = (req, res) => {
//     const id = req.params.id;
//     Carry.findByPk(id)
//         .then(data => {
//             if (!data) {
//                 res.status(400).send({
//                     message: "Carry not found."
//                 });
//             } else {
//                 res.send(data);
            
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Error finding carry."
//             });
//         });
// };

// Update One Carry with ID
exports.update = (req, res) => {
    const article_id = req.params.article_id;
    const purchase_id = req.params.purchase_id;

    Carry.update(req.body, {
        where: {
            article_id: article_id,
            purchase_id: purchase_id
        }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Carry updated."
            });
        } else {
            res.status(400).send({
                message: "Carry cannot be updated."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error updating the carry."
        });
    });
};

// Delete One Carry with ID
exports.delete = (req, res) => {
    const article_id = req.params.article_id;
    const purchase_id = req.params.purchase_id;

    Carry.destroy({
        where: {
            article_id: article_id,
            purchase_id: purchase_id
        }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Carry deleted."
            });
        } else {
            res.status(400).send({
                message: "Error finding carries."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error finding carries."
        });
    });
};





