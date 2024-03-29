import {
  IFileRepository,
  IFileRepositoryToken,
} from '@business/repositories/file/iFileRepository'
import {
  IPermissionRepository,
  IPermissionRepositoryToken,
} from '@business/repositories/permission/iPermissionRepository'
import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import {
  IRolePermissionRepository,
  IRolePermissionRepositoryToken,
} from '@business/repositories/rolePermission/iRolePermissionRepository'
import {
  ITransactionRepository,
  ITransactionRepositoryToken,
} from '@business/repositories/transaction/iTransactionRepository'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/user/iUserRepository'
import { FileRepository } from '@framework/repositories/sequelize/file'
import { PermissionRepository } from '@framework/repositories/sequelize/permission'
import { RoleRepository } from '@framework/repositories/sequelize/role'
import { RolePermissionRepository } from '@framework/repositories/sequelize/rolePermission'
import { TransactionRepository } from '@framework/repositories/sequelize/transaction'
import { UserRepository } from '@framework/repositories/sequelize/user'
import { ContainerModule, interfaces } from 'inversify'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ITransactionRepository>(ITransactionRepositoryToken).to(
    TransactionRepository
  )
  bind<IRoleRepository>(IRoleRepositoryToken).to(RoleRepository)

  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)

  bind<IFileRepository>(IFileRepositoryToken).to(FileRepository)

  bind<IPermissionRepository>(IPermissionRepositoryToken).to(
    PermissionRepository
  )

  bind<IRolePermissionRepository>(IRolePermissionRepositoryToken).to(
    RolePermissionRepository
  )
})
