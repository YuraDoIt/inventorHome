import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
     MongooseModule.forRoot("mongodb+srv://yura:<mongoyura>@cluster0.ayqrl.mongodb.net/nestdb?retryWrites=true&w=majority")
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
