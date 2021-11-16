import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './schemas/user.service';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports:[
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ])
    ]
})

export class UserModule{}