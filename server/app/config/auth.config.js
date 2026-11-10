module.exports = {
  SECRET: process.env.JWT_SECRET,
  COOKIE_NAME: 'jwt',
  COOKIE_OPTIONS: {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  },
  MAX_AGE: 24 * 60 * 60 * 1000,
};
