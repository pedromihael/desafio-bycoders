import 'reflect-metadata';
import 'regenerator-runtime/runtime.js';

import cors from 'cors';
import express from "express"
import bodyParser from "body-parser"
import { AppDataSource } from "@infrastructure/interface/database/data-source"
import { StoreRoutes } from '@domain/store/gateway/routes';
import { OwnerRoutes } from '@domain/owner/gateway/routes';
import { OperationRoutes } from '@domain/operation/gateway/routes';
import { TransactionRoutes } from '@domain/transaction/gateway/routes';
import { registerExpressRoutes } from '@shared/helper/registerExpressRoutes';
import { initializeLogs } from '@shared/helper/initializeLogs';

import '@infrastructure/middleware/ContainerRegistry';

const PORT = process.env.PORT || 3006;

AppDataSource.initialize().then(async () => {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors());
  app.use(bodyParser.json());
  initializeLogs(app)

  // register express routes from defined application routes
  registerExpressRoutes(app, StoreRoutes)
  registerExpressRoutes(app, OwnerRoutes)
  registerExpressRoutes(app, OperationRoutes)
  registerExpressRoutes(app, TransactionRoutes)

  app.listen(PORT, () => {
    console.log(`Server is running! Served in ${PORT}!`);
  });
}).catch(error => console.error(error))
