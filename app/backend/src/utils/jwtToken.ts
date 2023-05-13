import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || '';

function createToken(param: object) {
  const Config = jwt.sign(param, secret, { algorithm: 'HS256', expiresIn: '1d' });
  return Config;
}

function verifyToken(token: string) {
  const checkToken = jwt.verify(token, secret);
  return checkToken;
}

export { createToken, verifyToken };
