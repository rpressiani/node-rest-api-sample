import * as authController from '../controllers/auth.controller';

const routes = [
  {
    method: 'POST',
    url: '/api/register',
    handler: authController.register,
    public: true,
  },
  {
    method: 'GET',
    url: '/api/me',
    handler: authController.me,
  },
  {
    method: 'POST',
    url: '/api/login',
    handler: authController.login,
    public: true,
  },
];

export default routes;
