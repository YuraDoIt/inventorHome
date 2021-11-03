import mongose from "mongoose";

const Role = new mongose.Schema({
    value: {type: String, unique: true, default: "User"}
});

const modRole = mongose.model("Role", Role);
export {modRole};