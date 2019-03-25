const db = require('./index');

module.exports.addDish = ({
  userId,
  yelpId,
  dishName,
  dishRatings,
  dishNotes
}, cb) => {

  db.Dish.create({
      userId,
      yelpId,
      dishName,
      dishRatings,
      dishNotes,
    })
    .then((dish) => {
      console.log('dish in add:', dish.dataValues);
      cb(dish.dataValues);
    });
};

module.exports.findAllDishes = (userId, yelpId, cb) => {
  db.Dish.findAll({
      where: {
        userId,
        yelpId
      }
    })
    .then((dishes) => {
      cb(dishes);
    });
}