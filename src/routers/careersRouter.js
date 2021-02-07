const router = require('express').Router();

const careersController = require('../controllers/careersController');

router.get('/', async (req, res) => {
  const careersList = await careersController.getAll();
  res.status(200).send(careersList);
});

router.get('/:id/users', async (req, res) => {
  const id = parseInt(req.params.id);
  const usersByCareer = await careersController.getAllUsersByCareer(id);
  res.status(200).send(usersByCareer);
});

module.exports = router;
