import carRoutes from './car.routes';
import authRoutes from './auth.routes';

const routes = [
  ...carRoutes,
  ...authRoutes,
];

export default routes;
