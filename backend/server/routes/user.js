const express = require('express');
const router = express.Router();
const User = require('../database/models/User');


router.get('/', (req, res) => {
    User.findAll({
        include: 'direction',
        attributes: ['name', 'last_name', 'mail', 'is_admin']
    }).then(user => res.json(user));
});

// CREATE /api/users
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        last_name: req.body.last_name,
        mail: req.body.mail,
        password: req.body.password,
        is_admin: req.body.is_admin,
    }).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    })
});

// READ /api/deliverys/:id
router.get('/:id', (req, res) => {
    User.findByPk({
        include: 'direction',
        attributes: ['name', 'last_name', 'mail', 'is_admin']
    }).then(delivery => {
        res.json(delivery);
    })
});

// UPDATE /api/deliverys/:id
router.put('/:id', (req, res) => {
    User.update({
        name: req.body.name,
        last_name: req.body.last_name,
        mail: req.body.mail,
        password: req.body.password,
        is_admin: req.body.is_admin,
    }, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    });
});

// DELETE /api/deliverys/:id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    })
});
module.exports = router;