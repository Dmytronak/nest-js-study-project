import { Connection } from 'mongoose';
import { UserScheme } from 'src/shared/schemas/auth/user-auth.schema';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserScheme),
    inject: ['DATABASE_CONNECTION'],
  },
];