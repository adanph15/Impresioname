const db = require("../models");
const Direction = db.direction;
const Op = db.Sequelize.Op;

// Create Direction
exports.create = (req, res) => {
    // Validate request
    if (!req.body.direction || 
        !req.body.post_code || 
        !req.body.location || 
        !req.body.province || 
        !req.body.user_id) {
        return console.log('Missing data');
    }

    // Create a Direction
    const direction = {
        direction: req.body.direction,
        post_code: req.body.post_code,
        location: req.body.location,
        province: req.body.province,
        user_id: req.body.user_id
    };

    // Save Direction
    Direction.create(direction)
        .then(data => {
            res.send(data);
        })
        .catch(console.log('Error saving direction'));
};

// Find All directions
exports.findAll = (req, res) => {
    Direction.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(console.log('Error finding directions'));
};

// Find One Direction
exports.findOne = (req, res) => {
    const id = req.params.id;
    Direction.findByPk(id)
        .then(data => {
            if (!data) {
                console.log('Direction not found');
            } else {
                res.send(data);
            }
        })
        .catch(console.log('Error finding direction'));
};

// Update One Direction with ID
exports.update = (req, res) => {
    const id = req.params.id;
    Direction.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            console.log('Direction updated')
        } else {
            console.log('Direction cannot be deleted')
        }
    }).catch(console.log('Error updating the direction'));
};

// Delete One Direction with ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Direction.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            console.log('Direction deleted')
        } else {
            console.log('Direction cannot be deleted')
        }
    }).catch(console.log('Error deleting the direction'));
};              