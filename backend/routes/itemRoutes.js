// backend/routes/itemRoutes.js
const express = require('express');
const Item = require('../models/item');

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Add a new item
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    try {
        const newItem = new Item({ name, description });
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update an item
router.put('/:id', async (req, res) => {
    const { name, description } = req.body;
    try {
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );
        res.json(item);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete an item
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
