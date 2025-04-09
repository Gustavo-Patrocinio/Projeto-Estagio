<template>
  <div id="cadastrar-pessoas">
    <h1>Cadastrar Pessoas</h1>
    <!-- <form @submit.prevent="adicionarPessoa"> -->
    <form @submit.prevent="criarUsuario">
      <label>Nome:</label>
      <!-- v-model = armazenando o que esta escrito nas variaveis -->
      <input type="text" v-model="nome" placeholder="Nome" required />
      <br>

      <label>Idade:</label>
      <input type="number" v-model="idade" placeholder="Idade" required />
      <br>

      <label>CPF:</label>
      <input type="text" v-model="cpf" placeholder="CPF" required />
      <p>

      <label>Status:</label>
      <select v-model="status">
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>
    </p>
      <button type="submit">Adicionar</button>
    </form>
    <br>
    <h1>Lista de Pessoas</h1>
    <ul style="list-style-type: none;">
      <li v-for="usuario in usuarios" :key="usuario.id">
       Nome:  {{ usuario.nome }} <br>
       Idade: {{ usuario.idade }} anos <br>
       CPF: {{ usuario.cpf }} <br>
       Status: {{ usuario.status }} <br>
       <button @click="deletarUsuario(usuario.id)">Deletar</button>
       <br> <br>
      </li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios';
import {db} from '@/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default {
  // data = retorna um objeto com variaveis reativas
  data(){
    return {
      nome: "",
      idade: "",
      cpf: "",
      status: "",
      usuarios: []
    };
  },
  methods: {
    async criarUsuario(){
      // Impede enviar com campos vazios
      if (!this.nome || !this.idade || !this.cpf || !this.status) {
          alert("Campo vazio");
          return;
      }
    // criando um novo usuario passando os dados do form
    await addDoc(collection(db, "usuarios"), {
        nome: this.nome,
        idade: this.idade,
        cpf: this.cpf,
        status: this.status,
      });

      // Limpar os dados do form
      this.nome = ""
      this.idade = "",
      this.cpf = "",
      this.status = "",
      this.buscarUsuarios();
    },
    async buscarUsuarios(){
      // Pega os elementos inseridos na tabela usuarios
      const getUsuarios = await getDocs(collection(db,"usuarios"));
      // Transforma cada documento em um objeto com os campos e popula em usuarios
      this.usuarios = getUsuarios.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    },
    // deletar um documento a partir do id
    async deletarUsuario(id){
      await deleteDoc(doc(db,'usuarios',id));
      this.buscarUsuarios();
    }
  },
  // Executa a funcao logo quando carrega a pagina
  mounted() {
  this.buscarUsuarios();
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
