export default {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'rest-node',
      description: 'REST API with Node.js, MongoDB, Fastify and Swagger',
      version: '0.0.1',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'x-access-token',
        in: 'header',
      },
    },
  },
};
