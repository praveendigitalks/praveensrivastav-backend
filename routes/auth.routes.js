        import express from 'express';
        const router = express.Router();

        import { LoginUser, LogoutUser } from '../controller/auth.controller.js';
        import { protect } from '../midleware/auth.middleware.js';


        router.post("/", LoginUser);
        router.post("/logout", protect, LogoutUser);



        export default router;