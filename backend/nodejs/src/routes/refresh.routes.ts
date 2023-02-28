import { Router } from 'express';
import { handleRefreshToken } from '../controllers/refreshToken.controller'

const refreshRoutes = Router();

refreshRoutes.route('/') //prefixed with /refresh in app.ts
  .get(handleRefreshToken);

export default refreshRoutes;