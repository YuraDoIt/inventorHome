import mongose from "mongoose";

const User = new mongose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]
});


const modUser = mongose.model('User', User);
export {modUser};