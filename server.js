// Importa o módulo Express, que é a base para criar aplicações web Node.js
import express from "express";

// Importa as rotas definidas no arquivo postsRoutes.js
import routes from "./src/config/routes/postsRoutes.js";

// Cria uma instância do Express, que será o nosso aplicativo
const app = express();

// Serve arquivos estáticos (imagens) da pasta uploads
app.use(express.static("uploads"))
routes(app);

// Inicia o servidor na porta 3000 e exibi uma mensagem no console
app.listen(3000, () => {
    console.log("Servidor escutando...");
});