const bcrypt = require('bcryptjs');


/***    To hash password    ***/

// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);
// // Store hash in your password DB.

// Auto generate a salt and hash

// bcrypt.hash('bacon', 8, function(err, hash) {
// });

    // Or

// var hash = bcrypt.hashSync('bacon', 8);

/***    To check a password    ***/

// // Load hash from your password DB.
// bcrypt.compareSync("B4c0/\/", hash); // true
// bcrypt.compareSync("not_bacon", hash); // false

