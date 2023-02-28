import { Router } from 'express';
import { handleNewUser } from '../controllers/register.controller';

const registerRoutes = Router();

registerRoutes.route('/') //prefixed with /register in app.ts
  .post(handleNewUser);

export default registerRoutes;