import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/secret';

/* eslint-disable-next-line */
export const verifyToken = (req, res, done) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.code(403);
      throw new Error('No token provided');
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(500);
        throw new Error('Failed to authenticate token');
      }
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
    });
    done();
  } catch (err) {
    res.send(err);
  }
};
