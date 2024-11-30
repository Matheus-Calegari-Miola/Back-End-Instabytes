// Importa o módulo Express para criar aplicações web Node.js
import express from "express";

//Importa o módulo Multer para gerenciamento de uploads de arquivos
import multer from "multer";

// Importa funções controladores de posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js";

// Importa o módulo cors
import cors from "cors";

// Configurações para o CORS
const corsOptions = {

     // Define a origem permitida para requisições cross-origin
    origin: "http://localhost:8000",

    // Código de status para respostas de opções CORS bem-sucedidas
    optionsSucessStatus: 200
};

// Configurações de armazenamento de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // Define a pasta de destino para os uploads
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {

        // Define o nome do arquivo como o nome original
        cb(null, file.originalname);
    },
});

// Inicializa o middleware Multer
const upload = multer({ dest: "./uploads" , storage}); // Define o destino e o armazenamento para uploads

// Função para configurar as rotas da aplicação
const routes = (app) => {

    // Middlewares globais

     // Parseia solicitações JSON
    app.use(express.json());

    // Aplica configurações CORS
    app.use(cors(corsOptions));

// Rotas de aplicação

    // Rota para listas posts
    app.get("/posts", listarPosts); 

    // Rota para criar um novo post (importada do postsController)
    app.post("/posts", postarNovoPost);

    // Rota para upload de imagem com Multer (importada do postsController)
    app.post("/upload", upload.single("imagem"), uploadImagem );

     //Rota para atualizar um post (importada do postsController)
    app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes para uso no arquivo principal
export default routes;