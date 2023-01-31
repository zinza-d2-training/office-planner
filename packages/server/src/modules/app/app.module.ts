import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@server/modules/mikro-orm/mikro-orm.module';
import { AppController } from '@server/modules/app/app.controller';
import { AppService } from '@server/modules/app/app.service';

@Module({
  imports: [MikroOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
