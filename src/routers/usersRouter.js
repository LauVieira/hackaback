const router = require('express').Router();
const usersController = require('../controllers/usersController');
const registerSchema = require('../schemas/registerSchema');
const signInSchema = require('../schemas/signInSchema');
const userDataSchema = require('../schemas/userDataSchema');
const verifyJwt = require('../../src/middlewares/validation');
router
  .post('/sign-up', async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });
    if (await usersController.findByEmail(req.body.email)) return res.status(409).send({ error: 'Email already in use' });

    const user = await usersController.createUser(req.body);
    return res.status(201).send(user);
  });

router
  .post('/sign-in', async (req, res) => {
    const { error } = signInSchema.validate(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });
    const { email, password } = req.body;

    const session = await usersController.createSession(email, password);
    session.user.profileFilled = usersController.findUserData(session.user.id);
    
    res.status(201).send(session);
  });

router
  .post('/profile', verifyJwt, async (req, res) => {
    const { userData, title } = req.body;
    const { error } = userDataSchema.validate(userData);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const data = await usersController.createUserData({ data: userData, title });

    res.status(201).send(data);
  });

router.post('/sign-out', verifyJwt, async (req, res) => {
  await usersController.userSignOut(req.userId);
  res.sendStatus(204);
});

module.exports = router;
