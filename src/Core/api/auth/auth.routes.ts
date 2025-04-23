import { Router } from 'express';
import { AuthController } from './auth.controller';

const authRouter = Router();
const controller = AuthController()

authRouter.post('/login', controller.login);
authRouter.post('/register', controller.register);


export default authRouter;