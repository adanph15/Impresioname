const db = require("../models");
const Purchase = db.purchase;
const Op = db.Sequelize.Op;

// Create purchase
exports.create = (req, res) => {
    // Validate request
    if (!req.body.date ||
        !req.body.total ||
        !req.body.status ||
        !req.body.user_id) {
        return console.log('Missing data');
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
        .then(data => {
            res.send(data);
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
        .then(data => {
            if (!data) {
                console.log('Purchase not found');
            } else {
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

// Update One Purchase with ID
exports.update = (req, res) => {
    const id = req.params.id;
    Purchase.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            console.log('Purchase updated')
        } else {
            console.log('Purchase cannot be deleted')
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error updating the purchase."
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
            console.log('Purchase deleted')
        } else {
            console.log('Purchase cannot be deleted')
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error deleting the purchase."
        });
    });
};              