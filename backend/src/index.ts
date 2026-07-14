import express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// #####################################
// Importando as minhas rotas
import cadastroUser from "./routes/cadastroDeUsuario";
import loginDeUsuarios from "./routes/loginDeUsuarios";
import refreshToken from "./routes/refreshToken";
import postagemUsuario from "./routes/postagemDeServico";
import carregarServicos from "./routes/carregarServicos";
import postagemIndividual from "./routes/carregarPostagemDeUmUsuario";
import barraDePesquisa from "./routes/barraDePesquisa";
import deletraPostagem from "./routes/deletarPostagem";

// Dotoenv
import "dotenv/config";

// ######################################
app.use(express.json()); // Serve pra ler JSON do req.body
app.use(express.urlencoded({extended: true})); // Aqui ele esta lendo formularios
app.use(cookieParser()); // Configura o middleware para ler cookies (req.cookies)

// cors
app.use(cors()); // Depois colocar só as URLS que serão permitidas

// ######################################
// conectando as rotas no servidor
app.use(cadastroUser);
app.use(loginDeUsuarios);
app.use(refreshToken);
app.use(postagemUsuario);
app.use(carregarServicos);
app.use(postagemIndividual);
app.use(barraDePesquisa);
app.use(deletraPostagem);

let porta = 3000

app.listen(porta, () => {
    console.log(`Servidor Rodando na porta ${porta}`)
})