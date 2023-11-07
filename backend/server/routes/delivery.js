const express = require('express');
const router = express.Router();
const Delivery = require('../database/models/Delivery');

// INDEX /api/posts
router.get('/', (req, res) => {
    Delivery.findAll().then(delivery => {
        res.json(delivery);
    })
})

// CREATE
router.post('/', (req, res) => {
    Delivery.create({
        date: req.body.date,
        total: req.body.total,
        status: req.body.status
    }).then(delivery => {
        res.json(delivery);
    })
});

// READ /api/deliverys/:id
router.get('/:id', (req, res) => {
    Delivery.findByPk(req.params.id).then(delivery => {
        res.json(delivery);
    })
});

// UPDATE /api/deliverys/:id
router.put('/:id', (req, res) => {
    Delivery.update({
        date: req.body.date,
        total: req.body.total,
        status: req.body.status
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
    Delivery.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    })
});

module.exports = router;