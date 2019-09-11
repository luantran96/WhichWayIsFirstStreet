import * as db from './index';

export const addDish = ({
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
      cb(dish.dataValues);
    });
};

export const findAllDishes = (userId, yelpId, cb) => {
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