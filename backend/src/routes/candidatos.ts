import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import {verificarToken} from "../middlewares/auth";

const router = Router();

router.post ("/candidatar", verificarToken, (req: Request, res: Response) => {

    try {
   
        



        
    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor."});
    };

});

export default router;