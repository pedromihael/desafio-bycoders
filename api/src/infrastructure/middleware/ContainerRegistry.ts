
import 'reflect-metadata';
import { container } from 'tsyringe';
import { PostgresOperationRepository } from '@domain/operation/repository/PostgresOperationRepository';
import { IOperationRepository } from '@domain/operation/repository/IOperationRepository';
import { PostgresOwnerRepository } from '@domain/owner/repository/PostgresOwnerRepository';
import { IOwnerRepository } from '@domain/owner/repository/IOwnerRepository';

container.registerSingleton<IOperationRepository>('OperationRepository', PostgresOperationRepository);
container.registerSingleton<IOwnerRepository>('OwnerRepository', PostgresOwnerRepository);