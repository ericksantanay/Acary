import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
// Para rotas privadas

export function verificarToken(req: Request, res: Response, next: NextFunction) {
    
}