import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // This makes the PrismaService available globally in the application
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
