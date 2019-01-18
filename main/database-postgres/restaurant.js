const db = require('./index');

module.exports.addRestaurant = (restaurant, cb) => {
    //TODO:
  // Need to attach userId
  const {yelpId, name, image_url, url, display_phone, review_count, categories, rating, location, coordinates, photos, price, hours, notes, userId} = restaurant;

  db.Restaurant
    .findOrCreate({
      where: {
        yelpId,
        userId,
      }
    })
    .spread((foundRestaurant, created) => {
      cb(created);
    });

};

module.exports.removeRestaurant = () => {
    //TODO:
};

module.exports.findAllRestaurants = (cb) => {
  db.Restaurant.findAll()
    .then((restaurants) => {
      cb(restaurants);
    });
};
