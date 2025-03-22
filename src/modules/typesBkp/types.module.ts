import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { TypesSeed } from './seed/types.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  providers: [TypesSeed],
})
export class TypesModule {}