const express = require('express');
require('./db/mongoose');

const restaurantRouter = require('./router/restaurant');
const food_itemRouter = require('./router/food_item');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(restaurantRouter);
app.use(food_itemRouter);

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});