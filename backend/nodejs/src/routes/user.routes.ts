import { Router } from 'express';
import { handleNewUser } from '../controllers/register.controller';
import { getUser } from '../controllers/user.controller';

const userRoutes = Router();

userRoutes.route('/') //prefixed with /register in app.ts
  .get(getUser);

export default userRoutes;