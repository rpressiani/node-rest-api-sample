export const getSingleCarSchema = {
  description: 'Get car by id',
  tags: ['car-controller'],
  summary: 'Get single car',
};

export const addCarSchema = {
  description: 'Create a new car',
  tags: ['car-controller'],
  summary: 'Creates new car with given values',
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      brand: { type: 'string' },
      price: { type: 'string' },
      age: { type: 'number' },
      services: { type: 'object' },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        brand: { type: 'string' },
        price: { type: 'string' },
        age: { type: 'number' },
        services: { type: 'object' },
        __v: { type: 'number' },
      },
    },
  },
  security: [
    {
      apiKey: [],
    },
  ],
};
