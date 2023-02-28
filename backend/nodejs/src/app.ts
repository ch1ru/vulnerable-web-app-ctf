import express, { Request, Response, Application } from 'express';
import ip from 'ip';
import cors, { CorsOptions } from 'cors';
import { HttpResponse } from './http/response';
import { Code } from './http/code';
import { Status } from './http/status';
import authRoutes from './routes/auth.routes';
import registerRoutes from './routes/register.routes';
import userRoutes from './routes/user.routes';
import logoutRoutes from './routes/logout.routes';
import flagRoutes from './routes/flag.routes';
import { options } from './config/corsOptions';

const verifyJWT = require('../src/middleware/verifyJWT');
const cookieParser = require('cookie-parser');

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = 'application is running on:';
  private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server';

  constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 4000) {
    this.app = express();
    this.middleWare(options)
    this.routes();
  }

  listen(): void {
    this.app.listen(this.port);
    console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
  }

  private middleWare(corsOptions: CorsOptions): void {
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private routes(): void {
    this.app.use('/register', registerRoutes);
    this.app.use('/auth', authRoutes);
    this.app.use('/logout', logoutRoutes);
    this.app.use('/flag', flagRoutes);
    this.app.use('/user', userRoutes);

    this.app.all('*', (_: Request, res: Response)=> res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
  }
}