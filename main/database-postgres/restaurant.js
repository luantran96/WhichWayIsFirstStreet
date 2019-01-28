const db = require('./index');

module.exports.addRestaurant = (restaurant, cb) => {
  //TODO:
  // Need to attach userId

  // console.log('restaurant in add API:', restaurant);
  let {
    id,
    name,
    image_url,
    url,
    display_phone,
    review_count,
    categories,
    rating,
    location,
    coordinates,
    photos,
    price,
    hours,
    userId } = restaurant;

  location = location.display_address.join(' ');
  console.log('hours: ', hours[0].open);
  hours = hours[0].open || [];

  console.log('location: ', location);

  db.Restaurant
    .findOne({
      where: {
        yelpId: id,
      },
    })
    .then((foundRestaurant) => {
      if (!foundRestaurant) {
        db.Restaurant.create({
          yelpId: id,
          name,
          image_url,
          url,
          display_phone,
          review_count,
          categories,
          rating,
          location,
          coordinates,
          photos,
          price,
          hours,
          userId,
        })
          .then(() => {
            cb(true);
          });
      } else {
        cb(false);
      }
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

