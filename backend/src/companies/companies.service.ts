import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, settings?: any) {
    return this.prisma.client.company.create({
        data: {
            name,
            settings: settings ?? {},
        },
    });
  }

  async findAll() {
    return this.prisma.client.company.findMany({
        include: {
            routes: true,
        }
    });
  }
}
