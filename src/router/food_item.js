const express = require('express');
const Food_item = require('../models/food_item');

const router = express.Router();

router.use(express.json());

// add food item --on
router.post('/admin/food_item/add', async (req, res) => {
  try {
    const { name, description, category, Type, pic, ingredient } = req.body;
    
    const food_item = new Food_item({
      name,
      description,
      category,
      Type,
      pic,
      ingredient,
    });
    await food_item.save();
    res.status(200).send(food_item);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
