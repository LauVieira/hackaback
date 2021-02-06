const router = require('express').Router();
const usersController = require('../controllers/usersController');
const registerSchema = require('../schemas/registerSchema');
const signInSchema = require('../schemas/signInSchema');
const userDataSchema = require('../schemas/userDataSchema');
const verifyJwt = require('../../midllewares/validation');
router
  .post('/sign-up', async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });
    if (await usersController.findByEmail(req.body.email)) return res.status(409).send({ error: 'Email already in use' });

    const user = await usersController.create(req.body);
    return res.status(201).send(user);
  });

router
  .post('/sign-in', async (req, res) => {
    const { error } = signInSchema.validate(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const { email, password } = req.body;
    const session = await usersController.createSession(email, password);

    res.status(201).send(session);
  });

router
  .post('/profile', verifyJwt, async (req, res) => {
    const { error } = userDataSchema.validate(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const { userId, description, level, linkedin, topic, photo, website } = req.body;
    const userData = await usersController.createUserData(userId, description, level, linkedin, topic, photo, website);

    res.status(201).send(userData);
  });

router.post('/sign-out', verifyJwt, async (req, res) => {
  await usersController.userSignOut(req.userId);
  res.status(204);
});

module.exports = router;
