import { Router } from "express";
import {AuthController} from "./authController.js";
import { check } from "express-validator";

const authControl = new AuthController();
const router = new Router();

router.post('/registration', authControl.registration );
router.post('/login', authControl.login);
router.get('/users', authControl.getUser);

export {router};