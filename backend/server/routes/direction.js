const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Direction = require('../database/models/Direction');

router.get('/', (req, res) => {
    Direction.findAll({
        include: {
            model: User,
            as: "user",
            attributes: ['name', 'last_name', 'mail']
        }
    }).then(direction => res.json(direction));
});

// CREATE /api/users
router.post('/', (req, res) => {
    Direction.create({
        direction: req.body.direction,
        post_code: req.body.post_code,
        location: req.body.location,
        province: req.body.province,
        userId: req.body.userId
    }).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    })
});

module.exports = router;