import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

type Id = {
    id: string
}

export async function verificarRole(req: Request, res: Response, next: NextFunction) {

    const accessTokenJwt = req.cookies.acess_token;

    if (!accessTokenJwt) {
        return res.status(401).json({mensagem: "Acesso negado. Token não fornecido."});
    };

    try {

        // Verificando o jwt
        const {id} = jwt.verify(accessTokenJwt, process.env.JWT_SECRET ?? '') as Id;

        // Buscando o user pelo id
        const user = await prisma.usuario.findUnique({
            where:{
                id: id
            }
        });

        // Verificando se esse usuario existe
        if (!user) {
            return res.status(404).json({mensagem: "Usuario não existe"});
        };

        // Verificando o role
        if (user.role !== "admin") {
            return res.status(403).json({mensagem: "Voce não tem permissão."});
        };

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    };
};