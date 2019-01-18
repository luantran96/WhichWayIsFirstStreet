const Sequelize = require('sequelize');

const sequelize = new Sequelize('luantran', '', '', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Or you can simply use a connection uri
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

// Testing connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
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

const Restaurant = sequelize.define('restaurant', {
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
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  rating: {
    type: Sequelize.DECIMAL,
  },
  location: {
    type: Sequelize.STRING,
  },
  coordinates: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  photos: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.TEXT,
  },
  hours: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  notes: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: true,
});


User.hasMany(Restaurant, {
  as: 'Restaurants',
  foreignKey: 'userId',
});

User.sync({ force: true })
  .then(() => {
    Restaurant.sync({ force: true });
  });

module.exports = {
  User,
  Restaurant,
};
