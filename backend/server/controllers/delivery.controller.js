const db = require("../models");
const Delivery = db.delivery;
const Op = db.Sequelize.Op;

// Create Delivery
exports.create = (req, res) => {
    // Validate request
    if (!req.body.date || !req.body.total || !req.body.status || !req.body.user_id) {
        return console.log('Missing data');
    }

    // Create a Delivery
    const delivery = {
        date: req.body.date,
        total: req.body.total,
        status: req.body.status,
        user_id: req.body.user_id
    };

    // Save Delivery
    Delivery.create(delivery)
        .then(data => {
            res.send(data);
        })
        .catch(console.log('Error saving delivery'));
};

// Find All Deliveries
exports.findAll = (req, res) => {
    Delivery.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(console.log('Error finding deliveries'));
};

// Find One Delivery
exports.findOne = (req, res) => {
    const id = req.params.id;
    Delivery.findByPk(id)
        .then(data => {
            if (!data) {
                console.log('Delivery not found');
            } else {
                res.send(data);
            }
        })
        .catch(console.log('Error finding delivery'));
};

// Update One Delivery with ID
exports.update = (req, res) => {
    const id = req.params.id;
    Delivery.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            console.log('Delivery updated')
        } else {
            console.log('Delivery cannot be deleted')
        }
    }).catch(console.log('Error updating the delivery'));
};

// Delete One Delivery with ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Delivery.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            console.log('Delivery deleted')
        } else {
            console.log('Delivery cannot be deleted')
        }
    }).catch(console.log('Error deleting the delivery'));
};              