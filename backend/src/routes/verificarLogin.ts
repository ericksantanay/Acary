import { Router } from "express";
import { Request, Response } from "express";
import {verificarToken} from "../middlewares/auth";

const  router = Router();

router.get('/verificarLogin', verificarToken, async (req: Request, res: Response) => {

    res.status(200).json({mensagem: "Autenticado"})
});

export default router;