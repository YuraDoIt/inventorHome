import {modUser} from './models/user.js';
import {modRole} from './models/role.js';
import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';

class AuthController {
    async registration(req, res) {
        try{
            // const errors = validationResult(req);
            // if(!error.isEmpty()){
            //     return res.status(400).json({message: "Помилка при реєстрації", errors});
            // }
            const {username , password } = req.body;
            User.findOne({username});

            if(candidate){
                return res.status(400).json({message: 'Користувач уже існує'})
            }
            else console.log("User not exist");
            
            let hashPassword = bcrypt.hashSync(password, 6);
            const userRole = await modRole.findOne({value:'User'})
            const user = new modUser({username, password:hashPassword, roles: [userRole.value] });
            
            //Need debug this problem with empty string
            await user.save((err,result)=>{ 
                    if(err) console.log(err)
                    console.log(result);
                })
            return res.json({message: "Користувач був успішно створений"})
        }
        catch(e){
            console.log(e);
            res.status(400).json({message: 'Registered error'});
        }
    }

    async login(req, res){
        try{
            const {username, password } = req.body;
            const user = await userRole.findOne({username});
            if(!user){
                return res.status(400).json({message: 'Даний користувач не зареєстрований'});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.status(400).json({message: 'Введений пароль невірний'});
            }

        }
        catch(e){
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }

    async getUser(req, res){
        try{
            // const userRole = new modRole();
            // const adminRole = new modRole({value: "ADMIN"});
            // await userRole.save();
            // await adminRole.save((err,result)=>{
            //     if(err) console.log(err)
            //     console.log(result);
            // })

            res.json("server work");
        }
        catch(e){
            throw e;
        }
    }
}

export {AuthController};
