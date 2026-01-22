import express from 'express';
const router = express.Router();

import { LoginUser } from '../controller/auth.controller.js';


router.post("/", LoginUser);


export default router;