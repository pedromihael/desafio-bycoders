
import 'reflect-metadata';
import { container } from 'tsyringe';
import { PostgresOperationRepository } from '@domain/operation/repository/PostgresOperationRepository';
import { IOperationRepository } from '@domain/operation/repository/IOperationRepository';
import { PostgresOwnerRepository } from '@domain/owner/repository/PostgresOwnerRepository';
import { IOwnerRepository } from '@domain/owner/repository/IOwnerRepository';
import { PostgresStoreRepository } from '@domain/store/repository/PostgresStoreRepository';
import { IStoreRepository } from '@domain/store/repository/IStoreRepository';
import { PostgresTransactionRepository } from '@domain/transaction/repository/PostgresTransactionRepository';
import { ITransactionRepository } from '@domain/transaction/repository/ITransactionRepository';

container.registerSingleton<IOperationRepository>('OperationRepository', PostgresOperationRepository);
container.registerSingleton<IOwnerRepository>('OwnerRepository', PostgresOwnerRepository);
container.registerSingleton<IStoreRepository>('OwnerRepository', PostgresStoreRepository);
container.registerSingleton<ITransactionRepository>('OwnerRepository', PostgresTransactionRepository);