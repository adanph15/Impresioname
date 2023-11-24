const db = require("../models");
const Carry = db.carry;
const Op = db.Sequelize.Op;

// Create Carry
exports.create = (req, res) => {
    // Validate request
    if (!req.body.article_id || 
        !req.body.purchase_id) {
        return console.log('Missing data');
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
        .catch(console.log('Error saving carry'));
};

// Find All Deliveries
exports.findAll = (req, res) => {
    Carry.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(console.log('Error finding carries'));
};

// Find One Carry
exports.findOne = (req, res) => {
    const id = req.params.id;
    Carry.findByPk(id)
        .then(data => {
            if (!data) {
                console.log('Carry not found');
            } else {
                res.send(data);
            }
        })
        .catch(console.log('Error finding carry'));
};

// Update One Carry with ID
exports.update = (req, res) => {
    const id = req.params.id;
    Carry.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            console.log('Carry updated')
        } else {
            console.log('Carry cannot be deleted')
        }
    }).catch(console.log('Error updating the carry'));
};

// Delete One Carry with ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Carry.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            console.log('Carry deleted')
        } else {
            console.log('Carry cannot be deleted')
        }
    }).catch(console.log('Error deleting the carry'));
};              