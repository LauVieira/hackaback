class NotFoundError extends Error { };
class WrongPasswordError extends Error { };
class JwtError extends Error { };

module.exports = { NotFoundError, WrongPasswordError, JwtError };
