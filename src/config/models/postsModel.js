// Importa o módulo dotenv para carregar as variáveis de ambiente do arquivo .env
import 'dotenv/config'

// Importa a classe ObjectId do driver MongoDB para trabalhar com IDs de objetos
import { ObjectId } from "mongodb";

// Importa a função de conexão com o banco de dados MongoDB
import conectarAoBanco from "../dbConfig.js"

// Conecta ao banco de dados MongoDB usando a string de conexão fornecida no arquivo .env
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função para obter todos os posts
export async function getTodosPosts(){

    // Seleciona o banco de dados "imersão-instabytes"
    const db = conexao.db("imersao-instabytes");

    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    
    // Busca todos os documentos da coleção e retorna com um array
    return colecao.find().toArray();
}

// Função para criar um novo post
export async function criarPost(novoPost){
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    // Insere um novo documento na coleção "posts"
    return colecao.insertOne(novoPost);
}

// Função para atualizar um novo post existente
export async function atualizarPost(id, novoPost){
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    // Converte o ID de string em um ObjectId
    const objID = ObjectId.createFromHexString(id)
    // Busca o documento pelo ID
    return colecao.updateOne({_id:new ObjectId(objID)}, {$set:novoPost}); // Atualiza os campos do documento com novos valores
}