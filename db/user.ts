import * as db from './index';
import bcrypt from '../src/client/node_modules/bcryptjs';

export const addUser = (newUser, cb) => {
  const hash = bcrypt.hashSync(newUser.password, 8);
  newUser.password = hash;

  db.User.findOne({
    where: {
      email: newUser.email,
    },
  })
    .then(foundUser => {
      if (!foundUser) {
        db.User.create({
          email: newUser.email,
          password: newUser.password,
        }).then(user => {
          cb(user);
        });
      } else {
        cb(null);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const findUser = async (user): Promise<any> => {
  try {
    const { receivedPassword, receivedEmail } = user;
    const foundUser = await db.User.findOne({
      where: {
        email: receivedEmail,
      },
    });

    if (!!foundUser) {
      const storedHash = foundUser.password;
      if (bcrypt.compareSync(receivedPassword, storedHash)) {
        return foundUser;
      }
      return null;
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};

export const removeUser = () => {
  //TODO:
};
