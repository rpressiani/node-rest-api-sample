import bcrypt from 'bcryptjs';
import boom from 'boom';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/secret';
import User from '../models/User';

// Get all cars
export const register = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const createdUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: createdUser.id }, JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });

    return res.status(200).send({ token });
  } catch (err) {
    throw boom.boomify(err);
  }
};

export const me = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId, { password: 0 }, (err, user) => {
      if (err) throw new Error(err);
      return user;
    });

    if (currentUser) {
      return res.status(200).send(currentUser);
    }
    return boom.notFound(`User not found with id: ${req.userId}`);
  } catch (err) {
    throw boom.boomify(err);
  }
};

export const login = async (req, res) => {
  try {
    const currentUser = await User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw new Error(err);
      return user;
    });
    if (currentUser) {
      const passwordIsValid = bcrypt.compareSync(req.body.password, currentUser.password);
      if (!passwordIsValid) return boom.unauthorized();
      const token = jwt.sign({ id: currentUser.id }, JWT_SECRET, {
        expiresIn: 86400, // expires in 24 hours
      });

      return res.status(200).send({ token });
    }

    return boom.notFound(`User not found with email: ${req.body.email}`);
  } catch (err) {
    throw boom.boomify(err);
  }
};
