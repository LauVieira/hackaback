const router = require('express').Router();

const careersController = require('../controllers/careersController');

router.get('/careers', async (req, res) => {
  const careersList = await careersController.getAll();
  res.status(200).send(careersList);
});

module.exports = router;
