class AuthError extends Error {
  constructor (details) {
    super();
    this.details = details;
  }
}

module.exports = AuthError;
