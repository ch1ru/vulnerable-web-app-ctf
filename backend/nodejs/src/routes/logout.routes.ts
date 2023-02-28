import { Router } from 'express';
import { handleLogout } from '../controllers/logout.controller';

const logoutRoutes = Router();

logoutRoutes.route('/') //prefixed with /logout in app.ts
  .get(handleLogout);

export default logoutRoutes;