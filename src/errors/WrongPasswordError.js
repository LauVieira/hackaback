class WrongPasswordError extends Error {
  constructor (details) {
    super();
    this.details = details;
  }
}

module.exports = WrongPasswordError;
