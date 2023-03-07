const router = require("express").Router();
const Reator2 = require("../reator2");

router.get('/', (req, res) => {
  res.json({ message: "Hidrogenaçao" });
});

router.get('/reator2/naoFinalizados', async (req, res) => {
  try {
    const ultimoItem = await Reator2.findOne({ finalizado: false }).sort({ _id: -1 });
    res.json(ultimoItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o último item.' });
  }
});

router.get('/reator2/Finalizados', async (req, res) => {
  try {
    const ultimoItem = await Reator2.find({ finalizado: true }).sort({ _id: -1 });
    res.json(ultimoItem);
    console.log(ultimoItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o último item.' });
  }
});

router.post('/reator2/atualizar', async (req, res) => {
  const {
    data,
    hora,
    hidrogenioInicial,
    hidrogenioFinal,
    inicioAquecimento,
    finalAquecimento,
    operador,
    iodo,
    proximaAmostra,
    inicioResfriamento,
    temperatura,
    batelada,
    finalizado
  } = req.body;
  try {
    await Reator2.create({
      data,
      hora,
      hidrogenioInicial,
      hidrogenioFinal,
      inicioAquecimento,
      finalAquecimento,
      operador,
      iodo,
      proximaAmostra,
      inicioResfriamento,
      temperatura,
      batelada,
      finalizado
    });
    res.send('Dados inseridos com sucesso!')
  } catch (error) {
    res.status(500).send("Erro ao inserir os dados: " + error.message);
  }
});

router.get('/reator2/todos', async (req, res) => {
  try {
    const bateladas = await Reator2.find();
    res.json(bateladas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/reator2/batelada', async (req, res) => {
  const numeroBatelada = req.query.numeroBatelada;
  try {
    const reator2 = await Reator2.find({ batelada: numeroBatelada });
    console.log(reator2);
    res.json(reator2);
  } catch (error) {
    res.status(500).send("Erro ao buscar os objetos Reator2 com a batelada " + numeroBatelada);
  }
});

router.post('/reator2/andamento', async (req, res) => {
  try {
    const ultimaBateladaNaoFinalizada = await Reator2.findOne({ finalizado: false })
      .sort({ data: -1, hora: -1 })
      .exec();
    res.send(ultimaBateladaNaoFinalizada.toJSON());
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao buscar última batelada não finalizada' });
  }
});


module.exports = router;