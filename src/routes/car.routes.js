import * as carController from '../controllers/car.controller';
import * as documentation from './docs/car.docs';

const routes = [
  {
    method: 'GET',
    url: '/api/cars',
    handler: carController.getCars,
  },
  {
    method: 'GET',
    url: '/api/cars/:id',
    handler: carController.getSingleCar,
    schema: documentation.getSingleCarSchema,
  },
  {
    method: 'POST',
    url: '/api/cars',
    handler: carController.addCar,
    schema: documentation.addCarSchema,
  },
  {
    method: 'PUT',
    url: '/api/cars/:id',
    handler: carController.updateCar,
  },
  {
    method: 'DELETE',
    url: '/api/cars/:id',
    handler: carController.deleteCar,
  },
];

export default routes;
