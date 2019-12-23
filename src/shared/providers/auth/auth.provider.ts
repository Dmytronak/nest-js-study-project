import { Connection, Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';

export const authProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];