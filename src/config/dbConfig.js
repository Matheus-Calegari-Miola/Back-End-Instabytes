// Importa o cliente MongoDB para interagir com o banco de dados
import { MongoClient } from 'mongodb';

// Função assíncrona para conectar ao banco de dados
export default async function conectarAoBanco(stringConexao)
 {

  // Inicializa uma variável para armazenar o cliente MongoDB
  let mongoClient;

  try {
    
    // Cria uma nova instância do cliente MongoDB, passando a string de conexão
      mongoClient = new MongoClient(stringConexao);
      console.log('Conectando ao cluster do banco de dados...');

      // Conecta ao banco de dados de forma assícrona
      await mongoClient.connect();
      console.log('Conectado ao MongoDB Atlas com sucesso!');
      
      // Retorna o cliente conectado para uso em outras partes do código
      return mongoClient;
  } catch (erro) {

    // Caso ocorra algum erro durante a conexão, exibe uma mensagem de erro no console
      console.error('Falha na conexão com o banco!', erro);
      
      // Encerra o processo para evitar que a aplicação continue com falhas
      process.exit();
  }
}