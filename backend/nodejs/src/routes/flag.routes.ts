import { Router } from 'express';
import { getFlag } from '../controllers/flag.controller';

const flagRoutes = Router();

flagRoutes.route('/') //prefixed with /auth in app.ts
  .get(getFlag);

export default flagRoutes;