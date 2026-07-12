import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public readonly client: PrismaClient;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    this.client = new PrismaClient({ adapter });
  }

  async onModuleInit() {
    // Connect to the database when the module is initialized
    await this.client.$connect();
  }

  async onModuleDestroy() {
    // Disconnect from the database when the module is destroyed
    await this.client.$disconnect();
  }
}