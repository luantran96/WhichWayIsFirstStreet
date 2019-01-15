var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://localhost/restaurants');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  yelpId: String,
  quantity: Number,
  description: String,
  image: String,
  is_closed: Boolean,
  price: String,  
  title: String,
  coordinates: Object,
  hours: Object,
  url: String,
});

var Item = mongoose.model('Item', itemSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var deleteOne = (id, cb) => {
  Item.findByIdAndRemove(id, (err, item) => {
    cb(item);
  });
};

var Add = (item, cb) => {
  Item.create(item, (err, item) => {
    if (err) {
      throw err;
    }
    cb(item);
  });
};

var deleteAll = (cb) => {
  Item.deleteMany({}, (err) => {
    cb();
  })
};

module.exports.selectAll = selectAll;
module.exports.deleteAll = deleteAll;
module.exports.Add = Add;
module.exports.deleteOne = deleteOne;