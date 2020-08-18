const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

exports.userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (token) {
      const verify = await jwt.verify(token, SECRET_KEY);
      if (verify) {
        req.userInfo = verify;
        next();
      }
      if (!verify) {
        res.status(409).json({
          message: 'Authentication Failed',
        });
      }
    }
  } catch (error) {
    res.status(409).json({
      message: 'UnAuthorized',
    });
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      const verify = await jwt.verify(token, SECRET_KEY);
      if (verify) {
        res.status(200).json({
          message: 'auth success'
        })
      }
      if (!verify) {
        res.status(409).json({
          message: 'Authentication Failed',
        });
      }
    }
  } catch (error) {
    res.status(409).json({
      message: 'UnAuthorized',
    });
  }
}
