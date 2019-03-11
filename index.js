import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import mongoose from 'mongoose';

import swagger from './src/config/swagger';
import routes from './src/routes';

const app = fastify({ logger: true });

// Register Swagger
app.register(fastifySwagger, swagger.options);

// Connect to DB
mongoose.connect('mongodb://localhost/mycargarage', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

routes.forEach((route) => {
  app.route(route);
});

// Declare a route
app.get('/', async () => ({ hello: 'world' }));

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
