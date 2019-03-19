import fastify from 'fastify';
import _ from 'lodash';
import mongoose from 'mongoose';

import swaggerOptions from './config/swagger';
import routes from './routes';
import { verifyToken } from './utils/security.utils';

const app = fastify({ logger: true });

// Register Swagger
app.register(require('fastify-swagger'), swaggerOptions);
app.register(require('fastify-boom'));

// Connect to DB
// mongoose.connect('mongodb://localhost/mycargarage', { useNewUrlParser: true })
//   .then(() => console.log('MongoDB connected...'))
//   .catch(err => console.log(err));

app.get('/', async () => ({ hello: 'world' }));

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
    await app.listen(3000, '0.0.0.0');
    app.swagger();
    app.log.info(`server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
