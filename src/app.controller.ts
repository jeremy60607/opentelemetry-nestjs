import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Get('hello-world')
  async getLala(): Promise<string> {
    return await this.appService.getHello();
  }

  @Get(':id')
  async getLaa(@Param('id') id: string): Promise<string> {
    return await this.appService.getHello();
  }
}
