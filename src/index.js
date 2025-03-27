// Importando a biblioteca node-postgres
const { Client } = require("pg");

// Criando um client conectando ao banco
const client = new Client({
  user: "gustavo",
  host: "localhost",
  database: "biblioteca", 
  password: "1234",
  port: 5432,
});

// conectando no banco
client
  .connect()
  .then(() => console.log("Conectado ao Banco"))
  .catch((err) => console.error("Erro ao conectar ao Banco:", err));


// exportando o banco
module.exports = client;
