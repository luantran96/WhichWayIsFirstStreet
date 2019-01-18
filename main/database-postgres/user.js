const db = require('./index');
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


module.exports.addUser = (newUser, cb) => {
  const hash = bcrypt.hashSync(newUser.password, 8);
  newUser.password = hash;

  db.User
    .findOne({
      where: {
        email: newUser.email,
      },
    })
    .then((foundUser) => {
      if(!foundUser) {
        db.User
          .create({
            email: newUser.email,
            password: newUser.password,
          })
          .then(() => {
            cb(true);
          });
      } else {
        cb(false);
      }
    })
    .catch((err) => {
      // print the error details
      console.log(err);
  });
};

module.exports.checkUser = (user, cb) => {
  db.User.findOne({
    where: { email: user.email },
  })
    .then((foundUser) => {
      // Find user email in database and get hash
      if (foundUser) {
        const storedHash = foundUser.password;

        // compare stored hash with provided hash
        // If true, login user in
        if (bcrypt.compareSync(user.password, storedHash)) {
          cb(true);
        } else {
          // Else, re-prompts login
          cb(false);
        }

      } else {
        cb(false);
      }
    });

};

module.exports.removeUser = () => {
    //TODO:
};