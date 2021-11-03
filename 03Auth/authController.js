import {modUser} from './models/user.js';
import {modRole} from './models/role.js';
import bcrypt from 'bcryptjs';

class AuthController {
    async registration(req, res) {
        try{
            const {username , password } = req.body;
            const candidate = await modUser.findOne({username});

            if(candidate){
                return res.status(400).json({message: 'Користувач уже існує'})
            }
            else console.log("User not exist");
            
            let hashPassword = bcrypt.hashSync(password, 6);
            const userRole = await modRole.findOne({value:'ADMIN'})
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
