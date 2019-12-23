import { Connection, Repository } from 'typeorm';
import { Role } from 'src/shared/entities/admin/auth-roles.entity';

export const adminProviders = [
  {
    provide: 'ROLES_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Role),
    inject: ['DATABASE_CONNECTION'],
  },
];