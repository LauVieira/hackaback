class NotFoundError extends Error {
  constructor (details) {
    super();
    this.details = details;
  }
}

module.exports = NotFoundError;
