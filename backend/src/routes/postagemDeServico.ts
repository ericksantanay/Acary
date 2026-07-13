import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";

const router = Router();

router.post("/postarServicos", (req: Request, res: Response) => {

    const {cidade,  } = req.body;

});



export default router;