import {modUser} from './models/user.js';
import {modRole} from './models/role.js';

class AuthController {
    async registration(req, res) {
        try{

        }
        catch(e){
            throw e;
        }
    }

    async login(req, res){
        try{

        }
        catch(e){
            throw e;
        }
    }

    async getUser(req, res){
        try{
            const userRole = new modRole();
            res.json("server work");
        }
        catch(e){
            throw e;
        }
    }
}

export {AuthController};
