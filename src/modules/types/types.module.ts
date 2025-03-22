// src/modules/types/types.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { TypesService } from './types.service';
import { TypesResolver } from './types.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Type])], 
  providers: [TypesService, TypesResolver],
  exports: [TypesService],
})
export class TypesModule {}