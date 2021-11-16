import {
    Body, 
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Header, Param, 
    Post, 
    Put, 
    Redirect,
    Req,
    Res} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response, Request } from 'express';
import { UserService } from './schemas/user.service';
import { User } from './schemas/user.schema';

//express 
// app.use((req,res,next)=>{
//     res.status(201).end("End");
// })

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){

    }

    // @Get()
    // // @Redirect('https://google.com', 301)
    // getAll(@Req() req:Request, @Res() res:Response ){
    //     res.status(201).end('Bye');
    //     return 'getAll'
    // }

    @Get()
    getAll(): Promise<User[]>{
        return this.userService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id:string){
        return this.userService.getById(id);
    }

    @Post() 
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() CreateUserDto:CreateUserDto) {
        // return `Title:${CreateUserDto.name} + Age: ${CreateUserDto.age}`;
        return this.userService.create(CreateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id : string):Promise<User>{
        // return 'Remove' + id;
        return this.userService.remove(id);
    }

    @Put(':id')
    update(@Body() updateUserDto:UpdateUserDto, @Param('id') id: string):Promise<User>{
        // return 'Update' + id
        return this.userService.update(id, updateUserDto);
    }
}
