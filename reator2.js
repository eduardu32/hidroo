const mongoose = require('mongoose');

const Reator2 = mongoose.model('Reator2',{
  data: String,
  hora: String,
  hidrogenioInicial: Number,
  hidrogenioFinal: Number,
  numeroCarreta: Number,
  inicioAquecimento: String,
  finalAquecimento: String,
  operador: String,
  iodo: Number,
  proximaAmostra: String,
  inicioResfriamento: String,
  temperatura: Number,
  batelada: String,
  finalizado: Boolean,
  catalisador: String
});

module.exports = Reator2;