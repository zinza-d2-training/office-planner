import { Module } from '@nestjs/common';
import { MikroOrmModule as OrmModule } from '@mikro-orm/nestjs';
import config from '@server/mikro-orm.config';

@Module({
  imports: [
    OrmModule.forRoot(config),
    OrmModule.forFeature({
      entities: [],
    }),
  ],
  exports: [OrmModule],
})
export class MikroOrmModule {}
