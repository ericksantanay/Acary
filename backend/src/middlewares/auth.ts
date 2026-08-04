import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// Para rotas privadas

type ID = {
    id: string
}

interface RequestUserId extends Request {
    userId?: string
}

export function verificarToken(req: RequestUserId, res: Response, next: NextFunction) {

    // Pegando o acess Token
    const accessToken = req.cookies.acess_token

    console.log("Access Token:", accessToken);

     // Verificando se veio pelo req
    if (!accessToken) {
        console.log("Não chegou access token");
         return res.status(401).json({mensagem: "Acesso negado. Token não fornecido."});
    }

    try {

         // Valida o token. Se falhar, o código pula direto para o bloco catch. 
        const {id} = jwt.verify(accessToken, process.env.JWT_SECRET ?? '') as ID

         console.log("Token válido");

        req.userId = id

        // Next (Proximo)
        next()
    } catch (error) {
        console.log("Token expirado ou inválido");
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    };
};