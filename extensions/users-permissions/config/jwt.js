module.exports = {
  jwtSecret: process.env.JWT_SECRET || '3698befb-544a-4e4e-b3fd-82fcde54426f',
  jwt: {
    expiresIn: '5y'
  }
};
