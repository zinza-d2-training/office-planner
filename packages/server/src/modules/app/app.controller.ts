import { Controller, Get } from '@nestjs/common';
import { AppService } from '@server/modules/app/app.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '@server/modules/app-swagger/app-swagger.constant';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ tags: [AppSwaggerTag.App] })
  @Get()
  healthcheck() {
    return this.appService.healthcheck();
  }
}
