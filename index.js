const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');



// Configuração da conexão com o banco de dados
mongoose.connect('mongodb+srv://eduardu32:eduardu32Du@servidorhidro.cj0swan.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida com sucesso!");
  }).catch(err => {
    console.error("Erro ao conectar com o MongoDB: ", err);
    process.exit();
  });


const app = express();
app.use(cors());

app.use(express.json())
app.use(
  express.urlencoded({extended:true})
)



//rotas 
const reator2Rotas= require("./routas/reator2Rotas")

app.use('/', reator2Rotas)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
})