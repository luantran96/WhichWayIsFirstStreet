import express from 'express';
import path from 'path';
import * as user from '../../../db/user';

const router = express.Router();

router.get('/login', async (req, res) => {
  const { email, password } = req.query;
  const foundUser = await user.findUser({
    email,
    password,
  });

  res.json(foundUser);
});

router.get('/register', (req, res) => {
  const { email, password } = req.query;
  user.addUser(
    {
      email,
      password,
    },
    user => {
      res.status(200).json(user);
    }
  );
});

export default router;
