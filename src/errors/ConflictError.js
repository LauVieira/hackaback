class ConflictError extends Error {
  constructor (details) {
    super();
    this.details = details;
  }
}

module.exports = ConflictError;
