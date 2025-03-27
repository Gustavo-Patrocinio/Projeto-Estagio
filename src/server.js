// importando o servidor e o banco
const express = require("express");
const client = require("./index");

// inicializando servidor 
const app = express();
const PORT = 3000;

// permite o express processar requisicoes em json
app.use(express.json());

// **** ROTAS ****
app.post("/pessoa", async (req, res) => {
  try{
    // armazenando o body em variaveis
    const {cpf, status, nome, idade} = req.body;
    
    // inserindo no banco as variaveis do body
    const result = await client.query("INSERT INTO pessoas (cpf, status_pessoa, nome, idade) VALUES ($1,$2,$3,$4) RETURNING *",
      [cpf,status,nome,idade]);
      
      // Resposta de concluido
      res.status(201).json({message:"Pessoa adicionada", pessoa: result.rows[0]});
    } catch (error) {
      // mostrar o erro
      console.error(error);
      res.status(500).json({message:"Erro ao adicionar uma pessoa", error: error.message});
    }
});

app.get("/pessoa", async (req,res) => {
  try{
    // puxando todas colunas da tabela pessoas
    const result = await client.query("SELECT * FROM pessoas ")
    // mostrando todas colunas da tabela pessoas
    res.status(201).json(result.rows);
  } catch(error){
    console.error(error);
    res.status(500).json({message:"Erro ao buscar pessoas", error: error.message});
  }
});

app.put("/pessoa/:id", async (req,res) => {
  try{
    // armazenando o indice escrito na url
    const { id } = req.params;
    // armazenando o body em variaveis
    const {cpf, status, nome, idade} = req.body;
    // Alterando as informações da tabela a partir do indice
    const result = await client.query("UPDATE pessoas SET cpf = $2, status_pessoa = $3, nome = $4, idade = $5 WHERE ID_PESSOA = $1 RETURNING*", [id,cpf, status, nome, idade]);

    res.status(201).json({message:"Pessoa Alterada", pessoa: result.rows[id]});
  } catch(error){
    console.error(error);
    res.status(500).json({message:"Erro ao alterar a pessoa", error: error.message});
  }
});



app.delete("/pessoa/:id", async (req,res) => {
  try{
    const { id } = req.params;
    const result = await client.query("DELETE FROM pessoas WHERE ID_PESSOA = $1 RETURNING*", [id]);
    res.status(204).send();
  } catch(error){
    console.error(error);

    res.status(500).json({message:"Erro ao deletar a pessoa", error: error.message});
  }
});

// Iniciando servidor
app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT}`);
});
