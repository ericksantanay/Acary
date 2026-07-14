import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import {verificarToken} from "../middlewares/auth";

const router = Router();

router.delete("/deletarPostagem", (req: Request, res: Response) => {

});


export default router;