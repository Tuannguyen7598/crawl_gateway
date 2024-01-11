import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { ResHttp, ResHttpSchema } from './entity/resHttp.entity.js';
import { ResDom, ResDomSchema } from './entity/resDom.entity.js';
import { Model } from 'mongoose';
import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
const DEFAULT_ADMIN = {
  email: 'admin',
  password: '12345',
};
const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
AdminJS.registerAdapter(AdminJSMongoose);
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://user:pass@localhost:27017',
        auth: {
          username: 'user',
          password: 'pass',
        },
        dbName: 'crawl_data',
      }),
    }),

    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        imports: [
          MongooseModule.forFeature([
            { name: ResHttp.name, schema: ResHttpSchema },
            { name: ResDom.name, schema: ResDomSchema },
          ]),
        ],
        inject: [getModelToken(ResHttp.name), getModelToken(ResDom.name)],
        useFactory: (
          resHttpModel: Model<ResHttp>,
          resDomModel: Model<ResDom>,
        ) => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              {
                resource: resHttpModel,
                options: {
                  properties: {
                    latest_updated_at: {
                      isVisible: {
                        show: false,
                        list: false,
                      },
                    },
                    deleted_at: {
                      isVisible: {
                        show: false,
                        list: false,
                      },
                    },
                  },
                  sort: {
                    sortBy: 'created_at',
                    direction: 'desc',
                  },
                },
              },
              {
                resource: resDomModel,
                options: {
                  properties: {
                    latest_updated_at: {
                      isVisible: {
                        show: false,
                        list: false,
                      },
                    },
                    deleted_at: {
                      isVisible: {
                        show: false,
                        list: false,
                      },
                    },
                  },
                  sort: {
                    sortBy: 'created_at',
                    direction: 'desc',
                  },
                },
              },
            ],
          },
          auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'secret',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
          },
        }),
      }),
    ),
    MongooseModule.forFeature([
      { name: ResHttp.name, schema: ResHttpSchema },
      { name: ResDom.name, schema: ResDomSchema },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AdminModule {}
