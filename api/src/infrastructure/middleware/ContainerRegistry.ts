
import 'reflect-metadata';
import { container } from 'tsyringe';
import { PostgresOperationRepository } from '@domain/operation/repository/PostgresOperationRepository';
import { IOperationRepository } from '@domain/operation/repository/IOperationRepository';

container.registerSingleton<IOperationRepository>('OperationRepository', PostgresOperationRepository);