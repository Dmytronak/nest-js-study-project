import * as mongoose from 'mongoose';

export const databaseProvider = [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect(
          process.env.DB_CONNECTION_STRING,
          {
            useCreateIndex: true, 
            useNewUrlParser: true, 
            useUnifiedTopology: true
          }),
    },
  ];
