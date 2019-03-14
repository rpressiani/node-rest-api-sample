import fastify from 'fastify';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import mongoose from 'mongoose';

import { JWT_SECRET } from './config/secret';
import swaggerOptions from './config/swagger';
import routes from './routes';

const app = fastify({ logger: true });

// Register Swagger
app.register(require('fastify-swagger'), swaggerOptions);
app.register(require('fastify-boom'));

// Connect to DB
mongoose.connect('mongodb://localhost/mycargarage', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const verifyToken = (req, res, done) => {
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

_.forEach(routes, (route) => {
  if (route.public) {
    app.route(route);
  } else {
    app.route({ ...route, preHandler: verifyToken });
  }
});

// Run the server!
const start = async () => {
  try {
    await app.listen(3000);
    app.swagger();
    app.log.info(`server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
