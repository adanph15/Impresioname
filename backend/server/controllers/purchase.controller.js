const db = require("../models");
const Purchase = db.purchase;
const User = db.user;
const Op = db.Sequelize.Op;

// Create purchase
exports.create = (req, res) => {
    // Validate request
    if (!req.body.date ||
        !req.body.total ||
        !req.body.status ||
        !req.body.user_id) {
        res.status(400).send({ message: 'Missing data' });
        return;
    }

    // Create a purchase
    const purchase = {
        date: req.body.date,
        total: req.body.total,
        status: req.body.status,
        user_id: req.body.user_id
    };

    // Save purchase
    Purchase.create(purchase)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error saving purchase."
            });
        });
};

// Find All Purcharses
exports.findAll = (req, res) => {
    Purchase.findAll()
        .then(async data => {
            const purchasesWithUsernames = await Promise.all(data.map(async purchase => {
                const user = await User.findByPk(purchase.dataValues.user_id);
                purchase.dataValues.username = user.username;
                return purchase;
            }));

            res.send(purchasesWithUsernames);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error finding purchases."
            });
        });
};

// Find One Purchase
exports.findOne = (req, res) => {
    const id = req.params.id;
    Purchase.findByPk(id)
        .then(async data => {
            if (!data) {
                res.send({
                    message: "Purcharse not found."
                });
            } else {
                const user = await User.findByPk(data.dataValues.user_id);
                data.dataValues.username = user.username;
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error finding purchase."
            });
        });
};

exports.findByUser = (req, res) => {
    const userId = req.params.userId;

    let condition = userId ? { user_id: userId } : null;

    Purchase.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error user not found."
            });
        });
};

// Update One Purchase with ID
exports.update = (req, res) => {
    const id = req.params.id;
    Purchase.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Purchase updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Purchase with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating purchase with id=" + id
        });
    });
};

// Delete One Purchase with ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Purchase.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Purchase deleted successfully."
            });
        } else {
            res.send({
                message: "Purchase cannot be deleted."
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error deleting the purchase."
            });
        });
};              