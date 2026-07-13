import Router, {CookieOptions} from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const router = Router();

type ID = {
    id: string;
}

/*Eu terei que fazer uma condição no meu fetch, eu deixarei esse fetch dentro do fetch de alguma req, porque ai a cada req do usuario o refresh ira gerar sozinho!*/


router.post("/refreshToken", (req: Request, res: Response) => {

    const refresh = req.cookies.refresh_token;

    if (!refresh) {
        return res.status(401).json({mensagem: "Acesso negado. Token não fornecido."});
    };

    try {

        // Verificando o refresh
        const refreshTokenVerificando = jwt.verify(refresh, process.env.REFRESH_SECRET ?? '') as ID;

        // Criando um novo token
        const token = jwt.sign({id: refreshTokenVerificando.id}, process.env.JWT_SECRET ?? '', {expiresIn: '10m'})


        // Cookie config
        const cookie1Config: CookieOptions = {
            maxAge: 10* 60 * 1000, // 10 minutos
            httpOnly: true, //JavaScript não pode acessar esse cookie
            secure: false, // Quando for para producao deixar true!
            sameSite: 'strict'  // Protege contra ataques CSRF
        };

        // Criando um Novo access token!
        res.cookie('acess_token', token, cookie1Config);

        // Retornando sucesso!
        return res.status(200).json({mensagem: "Refresh feito com sucesso"})
        
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

})

export default router;