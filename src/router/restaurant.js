const express = require('express');
// const searchController = require('./searchController');
const FoodItem = require('../models/food_item');
const Restaurant = require('../models/restaurant');

const router = new express.Router();

//--------------------user--------------------

// to search up a restaurant -- on
router.get('/user/search', async (req, res) => {
  const restaurant_name = req.query.restaurant_name;

  try {
    const restaurant = await Restaurant.find({ name: restaurant_name });

    if (restaurant.length === 0) {
      return res.status(404).send({ error: 'Restaurant not found.' });
    }

    res.send(restaurant);
  } catch (e) {
    res.status(500).send({ error: 'Internal server error.', details: e });
  }
});



//to get dishes in a restaurant -- on
router.get('/user/view',async (req, res) => {
  try{

    const restaurant_name = req.query.restaurant_name;
    
    const restaurant = await Restaurant.find({ name: restaurant_name });

    if (restaurant.length === 0) {
      return res.status(404).send({ error: 'Restaurant not found.' });
    }

    res.send(restaurant[0].cuisines);
  }
  catch(e){
    res.status(404).send(e);
  }
});







//--------------------admin--------------------

// to add a restaurant -- on
router.post('/admin/restaurant/add', async (req, res) => {
  try {
    const { name, address, phone, pictures, cuisines } = req.body;

    const restaurant = new Restaurant({
      name,
      address,
      phone,
      pictures,
      cuisines,
    });

    await restaurant.save();

    res.status(200).send({ _id: restaurant._id });
  } catch (e) {
    res.status(404).send(e);
  }
});

// to delete a restaurant  -- on
router.delete('/admin/restaurant/delete', async (req, res) => {
  const restaurantId = req.body._id;

  try {
    const deletedRestaurant = await Restaurant.findByIdAndRemove(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).send({ error: 'Restaurant not found.' });
    }

    res.status(200).send({ deletedRestaurant });
  } catch (e) {
    res.status(500).send({ error: 'Internal server error.', details: e });
  }
});


// to add cuisine to a restaurant   --on
router.post('/admin/cuisine/add',async (req,res) => {

  const food_item_name = req.body.food_item_name;
  const restaurant_name = req.body.restaurant_name;

  try{

    const foodItem = await FoodItem.findOne({ name: food_item_name });
    const restaurant = await Restaurant.findOne({ name: restaurant_name });

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found.' });
    }
  
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    restaurant.cuisines.push({
      food_item: foodItem._id,
      price: req.body.price,
      availability: req.body.availability,
    });

    await restaurant.save();

    res.status(200).send({message: 'Cuisine added successfully.'});

  }
  catch(e){
    res.status(404).send(e);
  }
});

// to update cuisine of a restaurant --on
router.post('/admin/cuisine/update', async (req, res) => {
  const food_item_name = req.body.food_item_name;
  const restaurant_name = req.body.restaurant_name;
  const updatedCuisineData = {
    price: req.body.price,
    availability: req.body.availability,
  };

  try {
    const foodItem = await FoodItem.findOne({ name: food_item_name });
    const restaurant = await Restaurant.findOne({ name: restaurant_name });

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    const existingCuisineIndex = restaurant.cuisines.findIndex(
      (cuisine) => cuisine.food_item.equals(foodItem._id)
    );

    if (existingCuisineIndex === -1) {
      return res.status(404).json({ message: 'Cuisine not found for this food item.' });
    }

    restaurant.cuisines[existingCuisineIndex].price = updatedCuisineData.price;
    restaurant.cuisines[existingCuisineIndex].availability = updatedCuisineData.availability;

    await restaurant.save();
    res.status(200).json({ message: 'Cuisine updated successfully.' });
  } catch (e) {
    res.status(500).send(e);
  }
});


// to delete cuisine of a  --on
router.post('/admin/cuisine/delete', async (req, res) => {
  const food_item_name = req.body.food_item_name;
  const restaurant_name = req.body.restaurant_name;

  try {
    const foodItem = await FoodItem.findOne({ name: food_item_name });
    const restaurant = await Restaurant.findOne({ name: restaurant_name });

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    restaurant.cuisines = restaurant.cuisines.filter(
      (cuisine) => !cuisine.food_item.equals(foodItem._id)
    );

    await restaurant.save();

    res.status(200).json({ message: 'Cuisine deleted successfully.' });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;