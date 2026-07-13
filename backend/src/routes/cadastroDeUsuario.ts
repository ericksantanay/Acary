import  {Router} from "express";
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

const router = Router();

// Rota para o cadastro
router.post("/cadastroDeUsuarios", async (req: Request, res: Response) => {

    const {nome, email, senha, perfil } = req.body;

    if (!nome || !email || !senha || !perfil ) {
        return res.status(404).json({mensagem: "Preencha os campos corretamente e cadastre-se."});
    };

    // 
    try {

        // Senha com criptografia
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(senha, salt)

        // Buscando o usuario
        const users = await prisma.usuario.findUnique({
            where:{
                email: email 
            }
        });
         
        // Verificação
        if (!users) {
            await prisma.usuario.create({
                data:{
                    nome: nome,
                    email: email,
                    senha: hash,
                    perfil: perfil,
                    role: "cliente"
                }
            });

            return res.status(201).json({mensagem: "Conta criada com sucesso."});
        }else {
            return res.status(409).json({mensagem: "Usuario ja existe."})
        }

    } catch (error) {
        // console.log(error)
        return res.status(500).json({mensagem: "Erro no servidor."})
    }
})

export default router;