async function createUser(db, name, email, password, role) {
  await db.query('INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4)', [name, email, password, role]);
};

module.exports = {
  createUser,
};

