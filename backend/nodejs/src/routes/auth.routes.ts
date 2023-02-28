import { Router } from 'express';
import { handleLogin } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.route('/') //prefixed with /auth in app.ts
  .post(handleLogin);

export default authRoutes;