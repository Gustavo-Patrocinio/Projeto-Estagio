<template>
  <div id="cadastrar-pessoas">
    <h1>Cadastrar Pessoas</h1>
    <form @submit.prevent="adicionarPessoa">
      <label>Nome:</label>
      <!-- v-model = armazenando o que esta escrito em novaPessoa -->
      <input type="text" v-model="novaPessoa.nome" required />
      <br>

      <label>Idade:</label>
      <input type="number" v-model="novaPessoa.idade" required />
      <br>

      <label>CPF:</label>
      <input type="text" v-model="novaPessoa.cpf" required />
      <p>

      <label>Status:</label>
      <select v-model="novaPessoa.status">
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>
    </p>
      <button type="submit">Adicionar</button>
    </form>

    <h2>Lista de Pessoas</h2>
    <ul>
      <li v-for="pessoa in pessoas" :key="pessoa.id">
        {{ pessoa.nome }} <br> Idade: {{ pessoa.idade }} anos <br> CPF: {{ pessoa.cpf }} <br> STATUS: {{ pessoa.status }} <br> <br>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      novaPessoa: {
        nome: "",
        idade: "",
        cpf: "",
        status: "ativo",
      },
      pessoas: []
    };
  },
  mounted() {
    axios.get("http://localhost:3000/pessoa")
      .then(response => {
        this.pessoas = response.data;
      })
      .catch(error => {
        console.error("Erro ao buscar pessoas:", error);
      });
  },
  methods: {
    async adicionarPessoa(){
      try{
        const resposta = await axios.post("http://localhost:3000/pessoa", this.novaPessoa); 
        this.pessoas.push(resposta.data.pessoa);
        this.novaPessoa = {cpf:"",status:"",nome:"",idade:""};
      }catch(error){
        console.error(error)
      } 
    }
  }
};
</script>

<style>
#cadastrar-pessoas {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
