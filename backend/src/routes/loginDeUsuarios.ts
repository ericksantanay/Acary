import Router, {CookieOptions}  from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.post("/loginUsuario", async (req: Request, res: Response) => {

    const {email, senha} = req.body;

    if (!email || !senha) {
        return res.status(404).json({mensagem: "Faça o login corretamente."});
    };

    try {
        
        // Usuario
        const user  = await prisma.usuario.findUnique({
            where:{
                email: email
            }
        });

        // Validação se o usuario existe
        if (!user) {
            return res.status(404).json({mensagem: "Usuário ou senha incorretos"});
        };

        const password = await bcrypt.compare(senha, user.senha);

        // Verificando se a senha esta correta;
        if (!password) {
            return res.status(404).json({mensagem: "Usuário ou senha incorretos"})
        }

        // Opções dos cookie
         const cookie1Config: CookieOptions = {
            maxAge: 10* 60 * 1000, // 10 minutos
            httpOnly: true, //JavaScript não pode acessar esse cookie
            secure: false, // Quando for para producao deixar true!
            sameSite: 'strict'  // Protege contra ataques CSRF
        };

        const cookie2Config: CookieOptions = {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
            httpOnly: true, //JavaScript não pode acessar esse cookie
            secure: false, // Quando for para producao deixar true!
            sameSite: 'strict' // Protege contra ataques CSRF
        }

        // Criando o Token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET ?? "", {expiresIn: "10m"});

        const refresh = jwt.sign({id: user.id}, process.env.REFRESH_SECRET ?? "", {expiresIn: "7d"});

        res.cookie('acess_token', token, cookie1Config);
        res.cookie('refresh_token', refresh, cookie2Config);

        return res.status(200).json({mensagem:"Login efetuado com sucesso"});

    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor"})
    };

})

export default router;