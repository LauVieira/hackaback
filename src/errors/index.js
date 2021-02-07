class NotFoundError extends Error { };
class WrongPasswordError extends Error { };
class JwtError extends Error { };
class AuthError extends Error { };
class ConflictError extends Error { };

module.exports = { NotFoundError, WrongPasswordError, JwtError, AuthError, ConflictError };
