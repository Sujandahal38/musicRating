const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const {
  SECRET_KEY,
} = process.env;

const Admin = require('../model/Admin');

exports.Signup = async (req, res, next) => {
  try {
    const validationSchema = Joi.object({
      fullName: Joi.string().trim().max(78).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'np'],
        },
      }).required(),
      password: Joi.string().trim().max(78).required(),
      username: Joi.string().trim().lowercase(),
    });
    const validate = await validationSchema.validateAsync(req.body);
    if (validate) {
      const {
        fullName,
        email,
        username,
        password,
      } = req.body;
      const findUser = await Admin.findOne({
        $or: [{
          email,
        }, {
          username,
        }],
      });
      if (findUser) {
        res.status(409).json({
          message: `User already exists with email ${findUser.email} , please log in.`,
          email: findUser.email,
        });
      }
      if (!findUser) {
        const hash = await bcrypt.hashSync(password, 12);
        const avatar = await gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: '404',
        });
        const userData = new Admin({
          fullName,
          email,
          password: hash,
          username,
          avatar,
        });
        const saveData = userData.save();
        if (saveData) {
          res.status(201).json({
            message: 'User created Successfully 🙌',
          });
        }
      }
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
};

exports.Login = async (req, res, next) => {
  try {
    const {
      password,
    } = req.body;
    const checkUser = req.adminInfo;
    if (checkUser && req.body) {
      const verifyPassword = await bcrypt.compareSync(
        password,
        checkUser.password,
      );
      if (!verifyPassword) {
        res.status(401).json({
          message: 'invalid email or password',
        });
      }
      if (verifyPassword) {
        const token = await jwt.sign({
            email: checkUser.email,
            id: checkUser.id,
          },
          SECRET_KEY, {
            expiresIn: '2h'
          });
        if (token) {
          res.status(200).json({
            message: 'Logged in successfully 🎉',
            token,
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.AdminProfile = async (req, res, next) => {
  try {
    const {
      id
    } = req.adminInfo;
    const findUser = await Admin.findOne({
      _id: id
    });
    if (findUser) {
      res.status(200).json({
        findUser,
      });
    }
    if (!findUser) {
      res.status(404).json({
        message: 'admin not found',
      })
    }
  } catch (error) {
    next(error);
  }
};


exports.CheckUsername = async (req, res, next) => {
  try {
    const {
      username
    } = req.body;
    const checkUsername = await Admin.findOne({
      username
    });
    console.log(username, checkUsername);
    if (checkUsername) {
      res.status(400).json({
        data: checkUsername.email,
        message: 'Username already taken.'
      });
    }
    if (!checkUsername) {
      res.status(200).json({
        message: 'valid Username',
      });
    }
  } catch (error) {
    next(error)
  }
}

exports.changeAuthorization = async (req, res, next) => {
  try {
    const { id, isAdmin, isRoot } = req.body;
    const findUser = await Admin.find({_id: id});
    if (findUser) {
      const changeAuth = await Admin.findOneAndUpdate({ _id: id }, {
        $set : {
          isAdmin,
          isRoot
        }
      });
      if (changeAuth) {
        res.status(200).json({
          message: 'Access granted 🎉'
        })
      }
    }
    if (!findUser) {
      res.status(404).json({
        message: 'admin not found',
      })
    }
  } catch ({error}) {
    next(error);
  }
}

exports.adminData = async (req, res, next) => {
  try {
    const adminData = await Admin.find().sort({ _id: -1 });
    if (adminData) {
      res.status(200).json({
        adminData
      })
    }
    if (!adminData) {
      res.status(400).json({
        message: 'admin not found',
      })
    }
  } catch (error) {
    next(error);
  }
}