import { App } from './app';
import dotenv from 'dotenv';

dotenv.config();

const start = (): void => {

  let serverPort = process.env.PORT;
  const app = new App(serverPort);

  app.listen();
}

start();