import * as carController from '../controllers/carController';
import * as documentation from './docs/carApi';

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
