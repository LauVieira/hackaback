const router = require('express').Router();

const careersController = require('../controllers/careersController');

router.get('/', async (req, res) => {
  const careersList = await careersController.getAll();
  res.status(200).send(careersList);
});

router.get('/:id/users', async (req, res) => {
  res.status(200).send('Teste');
});

module.exports = router;
