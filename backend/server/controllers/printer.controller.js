const db = require("../models");
const Printer = db.printer;
const Op = db.Sequelize.Op;

// Create Printer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.model || 
        !req.body.type || 
        !req.body.article_id) {
        res.status(400).send({ message: 'Missing data' });
        return;
    }

    // Create a Printer
    const printer = {
        model: req.body.model,
        type: req.body.type,
        article_id: req.body.article_id
    };

    // Save Printer
    Printer.create(printer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error saving printer."
            });
        });
};

// Find All Printers
exports.findAll = (req, res) => {
    Printer.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error finding printers."
            });
        });
};

// Find One Printer
exports.findOne = (req, res) => {
    const id = req.params.id;
    Printer.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(500).send({
                    message: "Error finding printer."
                });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error finding printer."
            });
        });
};

// Update One Printer with ID
exports.update = (req, res) => {
    const id = req.params.id;
    Printer.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Printer updated."
            });
        } else {
            res.status(400).send({
                message: "Printer cannot be updated."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error updating the printer."
        });
    });
};

// Delete One Printer with ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Printer.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Printer deleted."
            });
        } else {
            res.status(400).send({
                message: "Error finding printer."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error deleting printer."
        });
    });
};   