const express = require('express');
const router = express.Router();
const Glasses = require('../database/models/Glasses');

// INDEX /api/posts
router.get('/', (req, res) => {
    Glasses.findAll().then(glasses => {
        res.json(glasses);
    })
})

// CREATE
router.post('/', (req, res) => {
    Glasses.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
    }).then(glasses => {
        res.json(glasses);
    })
});

// READ /api/glassess/:id
router.get('/:id', (req, res) => {
    Glasses.findByPk(req.params.id).then(glasses => {
        res.json(glasses);
    })
});

// UPDATE /api/glassess/:id
router.put('/:id', (req, res) => {
    Glasses.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
    }, {
        where: {
            id: req.params.id
        }
    }).then(glasses => {
        res.json(glasses);
    });
});

// DELETE /api/glassess/:id
router.delete('/:id', (req, res) => {
    Glasses.destroy({
        where: {
            id: req.params.id
        }
    }).then(glasses => {
        res.json(glasses);
    })
});

module.exports = router;