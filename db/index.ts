require('dotenv').config();
const Sequelize = require('sequelize');

/* Development DB */
const sequelize = new Sequelize(
  'postgres',
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000, 
    }
  },
);

export const User = sequelize.define('user', {
  uuid: {
    primaryKey: true,
    unique: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  }, 
});

export const Restaurant = sequelize.define('restaurant', {
  yelpId: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  image_url: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
  },
  display_phone: {
    type: Sequelize.STRING,
  },
  review_count: {
    type: Sequelize.INTEGER,
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.JSON),
  },
  rating: {
    type: Sequelize.DECIMAL,
  },
  location: {
    type: Sequelize.STRING,
  },
  coordinates: {
    type: Sequelize.JSON,
  },
  photos: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  price: {
    type: Sequelize.TEXT,
  },
  hours: {
    type: Sequelize.ARRAY(Sequelize.JSON),
  },
}, {
  timestamps: true,
});

export const Dish = sequelize.define('dish', {
  uuid: {
    primaryKey: true,
    unique: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  dishName: {
    type: Sequelize.TEXT,
  },
  dishRatings: {
    type: Sequelize.TEXT,
  },
  dishNotes: {
    type: Sequelize.TEXT,
  },
});

// Testing connection
sequelize
  .authenticate()
  .then(async () => {
    try {
      console.log('Connection has been established successfully.');
      User.hasMany(Restaurant, {
        as: 'Restaurants',
        foreignKey: 'userId',
      });
  
      Restaurant.hasMany(Dish, {
        as: 'Dishes',
        foreignKey: 'yelpId',
      });
  
      User.hasMany(Dish, {
        as: 'Users',
        foreignKey: 'userId',
      });
  
      await User.sync();
      await Restaurant.sync();
      await Dish.sync();
      
    } catch(err) {
      console.error('Unable to connect to the database:', err);
    }
  });




// module.exports = {
//   User,
//   Restaurant,
//   Dish
// };

