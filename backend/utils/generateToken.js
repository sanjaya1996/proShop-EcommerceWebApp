import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_PROSHOP, {
    expiresIn: '30d',
  });
};

export default generateToken;
