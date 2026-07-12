import express  from "express";
import cors from "cors";

const app = express();

// #####################################
// Importando as minhas rotas


// Dotoenv
import "dotenv/config";

// ######################################
app.use(express.json()); // Serve pra ler JSON do req.body
app.use(express.urlencoded({extended: true})); // Aqui ele esta lendo formularios

// cors
app.use(cors()); // Depois colocar só as URLS que serão permitidas

// ######################################
// conectando as rotas no servidor


let porta = 3000

app.listen(porta, () => {
    console.log(`Servidor Rodando na porta ${porta}`)
})