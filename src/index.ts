import 'reflect-metadata';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'http';

import { nodes } from './seeders/nodes';
import nodeRoutes from './routes/nodeRoutes';
import db from './models/index';

dotenv.config();

const app: Application = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;
const url = process.env.APP_URL;
let server: Server | null = null;

const createNodes = () => {
  for (let node of nodes) {
    db.Node.create(node);
  }
}

app.use('/', nodeRoutes);

db.sequelize.sync().then(async () => {
  if (await db.Node.count() === 0) {
    createNodes();
  }

  server = app.listen(port, async () => {
    console.log(`[server]: Server is running at ${url}:${port}`);
  });
});

export { server };

export default app;
