"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// #####################################
// Importando as minhas rotas
const cadastroDeUsuario_1 = __importDefault(require("./routes/cadastroDeUsuario"));
const loginDeUsuarios_1 = __importDefault(require("./routes/loginDeUsuarios"));
const refreshToken_1 = __importDefault(require("./routes/refreshToken"));
const postagemDeServico_1 = __importDefault(require("./routes/postagemDeServico"));
const carregarServicos_1 = __importDefault(require("./routes/carregarServicos"));
const carregarPostagemDeUmUsuario_1 = __importDefault(require("./routes/carregarPostagemDeUmUsuario"));
const barraDePesquisa_1 = __importDefault(require("./routes/barraDePesquisa"));
const deletarPostagem_1 = __importDefault(require("./routes/deletarPostagem"));
const atualizarPostagem_1 = __importDefault(require("./routes/atualizarPostagem"));
const candidatos_1 = __importDefault(require("./routes/candidatos"));
const carregarCandidatos_1 = __importDefault(require("./routes/carregarCandidatos"));
// Dotoenv
require("dotenv/config");
// ######################################
app.use(express_1.default.json()); // Serve pra ler JSON do req.body
app.use(express_1.default.urlencoded({ extended: true })); // Aqui ele esta lendo formularios
app.use((0, cookie_parser_1.default)()); // Configura o middleware para ler cookies (req.cookies)
// cors
app.use((0, cors_1.default)()); // Depois colocar só as URLS que serão permitidas
// ######################################
// conectando as rotas no servidor
app.use(cadastroDeUsuario_1.default);
app.use(loginDeUsuarios_1.default);
app.use(refreshToken_1.default);
app.use(postagemDeServico_1.default);
app.use(carregarServicos_1.default);
app.use(carregarPostagemDeUmUsuario_1.default);
app.use(barraDePesquisa_1.default);
app.use(deletarPostagem_1.default);
app.use(atualizarPostagem_1.default);
app.use(candidatos_1.default);
app.use(carregarCandidatos_1.default);
const porta = process.env.PORT || 3000;
app.listen(porta, () => {
    console.log(`Servidor Rodando na porta ${porta}`);
});
