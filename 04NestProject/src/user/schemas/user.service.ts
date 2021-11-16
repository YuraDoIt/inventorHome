import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User, UserDocument } from "./user.schema";

@Injectable()
    export class UserService{
        constructor(@InjectModel(User.name) private userModule: Model<UserDocument>){

        }   


        private user = []

        async getAll(): Promise<User[]>{
            return this.userModule.find().exec();
        }

        async getById(id:string): Promise<User>{
            return this.userModule.findById(id);
            // return this.user.find(p => p.id === id);
        }

        create(userDto: CreateUserDto): Promise<User>{
            // this.user.push({
            //     ...userDto,
            //     id: Date.now().toString()
            // });

            const newUser = new this.userModule(userDto)
            return newUser.save();
        }

        async remove(id:string): Promise<User>{
            return this.userModule.findByIdAndRemove(id);
        }

        async update(id:string, userDto: UpdateUserDto): Promise<User>{
            return this.userModule.findByIdAndUpdate(id, userDto, {new:true});
        }
}