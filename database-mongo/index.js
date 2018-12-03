var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  quantity: Number,
  description: String,
  image: String,
  is_closed: Boolean,
  price: String,
  title: String,
  coordinates: Object,
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

var Add = (item, cb) => {
  Item.create(item, (err, item) => {
    if (err) {
      throw err;
    }
    cb(item);
  });
};

module.exports.selectAll = selectAll;
module.exports.Add = Add;