import { Router } from "express";
import { verificarToken } from "../middlewares/auth";
import prisma from "../lib/prisma";
import { Request, Response } from "express";

const router = Router();

interface RequestUserId extends Request {
    userId?: string
}

router.get("/mostrarDadosDoPerfil", verificarToken, async (req: RequestUserId, res: Response) => {

    const usuario = req.userId;

    if (!usuario) {
        return res.status(404).json({mensagem: "Usuario não existe."});
    };

    try {
        
        const usuarioListagemDoPerfil = await prisma.usuario.findUnique({
            where: {
                id: usuario
            },
            select: {
                nome: true,
                email: true,
                perfil: true
            }
        });

        if (!usuarioListagemDoPerfil) {
            return res.status(404).json({mensagem: "Usuario não existe"});
        };

        return res.status(200).json(usuarioListagemDoPerfil);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({mensagem: "Erro no servidor"});
    };

});

export default router;