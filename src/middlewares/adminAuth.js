const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');

const { SECRET_KEY } = process.env;

exports.verifyAdmin = async (req, res, next) => {
  try {
    const {
      usernameOrEmail,
    } = req.body;
    const isUser = await Admin.findOne({
      $or: [{
        email: usernameOrEmail,
      }, {
        username: usernameOrEmail,
      }],
    });
    if (!isUser) {
      res.status(409).json({
        message: 'Email or Password Invalid',
      });
    }
    if (isUser && (isUser.adminType === 'admin' || isUser.adminType === 'root')) {
      req.adminInfo = isUser;
      next();
    }
    if (isUser && !isUser.adminType) {
      res.status(409).json({
        message: 'Unauthorized Admin',
      });
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
};

exports.adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      const decode = await jwt.verify(token, SECRET_KEY);
      if (decode) {
        req.adminInfo = decode;
        next();
      }
    }
    if (!token) {
      res.status(409).json({
        message: 'auth error',
      });
    }
  } catch (error) {
    res.status(409).json({
      message: 'UnAuthorized',
    });
  }
};
