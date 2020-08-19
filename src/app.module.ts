import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ItemModule } from './item/item.module';
import config from './config/keys';

@Module({
  imports: [TypegooseModule.forRoot(config.mongoURI), ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
