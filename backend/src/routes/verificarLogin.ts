import { Router } from "express";
import { Request, Response } from "express";
import {verificarToken} from "../middlewares/auth";
import prisma from "../lib/prisma";

const  router = Router();

interface RequestUserId extends Request {
    userId?: string
}

router.get('/verificarLogin', verificarToken, async (req: RequestUserId, res: Response) => {

    res.status(200).json({mensagem: "Autenticado"});

    const usuario = req.userId

    const usuarioPerfil = await prisma.usuario.findUnique({
        where: {
            id: usuario
        }
    }) 

    if (!usuarioPerfil) {
        return res.status(404).json({mensagem: "Usuario não existe"});
    };

    // #######################################
    if (usuarioPerfil.perfil === "Família") {
        return res.status(200).json({mensagem: "Autorização concedida para o usuario familia."});
    };

    if (usuarioPerfil.perfil === "Babá") {
        return res.status(200).json({mensagem: "Autorização concedida para o usuario baba."});
    };

});

export default router;