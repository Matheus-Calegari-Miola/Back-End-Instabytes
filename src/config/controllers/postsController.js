// Importa funções para interagir com o modelo de dados de posts
import  {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";

// Importa o módulo fs do Node.js para realizar operações com o sistema de arquivos
import fs from "fs";

// Importa a função para gerar descrições de imagens utilizando o modelo Gemini
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função para listar todos os posts
export async function listarPosts(req, res)
{
    // Obtém todos os posts do banco de dados
    const posts = await getTodosPosts();

    // Retorna os posts em formato JSON com status 200 (sucesso)
    res.status(200).json(posts);
}

// Função para criar um novo post
export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try{

        // Cria um novo post no banco de dados
        const postCriado = await  criarPost(novoPost)

        // Retorna o post criado em formato JSON com status 200 (sucesso)
        res.status (200).json(postCriado);
    } catch(erro) {

        // Loga o erro no console para depuração
        console.log(erro.message);

        // Retorna uma mensagem de erro com status 500 (erro interno do servidor)
        res.status(500).json({"Erro":"Falha na requisição"})

    }
}

// Função para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {

    // Cria um objeto com as informações do novo post, incluindo o nome original da imagem
    const novoPost = {

        // Descrição será gerada posteriormente
        descricao: "", 
        imgUrl: req.file.originalname,
        alt: ""
    };

    try{

        // Cria um novo post no banco de dados
        const postCriado = await  criarPost(novoPost);

        // Gera um novo nome para a imagem, utilizando o ID do post
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`

        // Move a imagem para o diretório de uploads com o novo nome
        fs.renameSync(req.file.path, imagemAtualizada)

        // Retorna o post criado em formato JSON com status 200(sucesso)
        res.status (200).json(postCriado);
    } catch(erro) {

        //Retorna uma mensagem de erro com status 500 (erro interno do servidor)
        console.log(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});

    }
}

// Função para atualizar um post existente com uma descrição gerada pelo Gemini
export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {

        // Lê o conteúdo da imagem como um buffer
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        // Cria um objeto com as informações atualizadas do post
        const post ={
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };

        // Atualiza o post no banco de dados
        const postCriado = await  atualizarPost(id, post);

        // Retorna o post atualizado em fomrato JSON com status 200 (sucesso)
        res.status (200).json(postCriado);
    } catch(erro) {

        // Loga o erro no console para depuração
        console.log(erro.message);

        // Retorna uma mensagem de erro com status 500 (erro interno do servidor)
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}