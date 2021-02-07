class JwtError extends Error {
  constructor (details) {
    super();
    this.details = details;
  }
}

module.exports = JwtError;
