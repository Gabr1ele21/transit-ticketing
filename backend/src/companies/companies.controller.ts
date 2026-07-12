import { Controller, Get, Post, Body } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  async create(@Body() body: { name: string; settings?: any }) {
    return this.companiesService.create(body.name, body.settings);
  }

  @Get()
    async findAll() {
    return this.companiesService.findAll();
  }
}
