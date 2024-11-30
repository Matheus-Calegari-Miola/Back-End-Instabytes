// Importa a classe para interagir com a API do Google Generative AI
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializa o cliente da API do Google Generative AI usando a chave de API fornecida como variável de ambiente
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo Gemini 1.5 Flash para geração de texto
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função assícrona para gerar uma descrição em português para uma imagem
export default async function gerarDescricaoComGemini(imageBuffer) {

  // Prompt padrão para a geração de texto
  const prompt =
    "Gere uma descrição em português do brasil para a seguinte imagem";

  try {

    // Cria um objeto que representa a imagem, convertendo o buffer para base64
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };

    // Gera o conteúdo usando o modelo e a prompt, incluindo a imagem
    const res = await model.generateContent([prompt, image]);

    // Extrai o texto da resposta e retorna, ou uma mensagem padrão caso não haja texto
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    
    // Caso ocorra algum erro, loga a mensagem de erro e relança uma nova exceção com uma mensagem mais amigável
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}