const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
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
      username: Joi.string().trim(),
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
      console.log(username);
      if (findUser) {
        res.status(409).json({
          message: 'User already exists, please log in.',
        });
      }
      if (!findUser) {
        const hash = await bcrypt.hashSync(password, 12);
        const avatar = await gravatar.url(email,{s: '200', r: 'pg', d: '404'});
        const userData = new Admin({
          fullName,
          email,
          password: hash,
          username,
          avatar,
        });
        const saveData = userData.save();
        if (saveData) {
          res.status(200).json({
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
        SECRET_KEY, { expiresIn: '2h' });
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
    const { id } = req.adminInfo;
    console.log(id);
    const findUser = await Admin.findOne({_id: id});
    if(findUser) {
      res.status(200).json({
        findUser,
      });
    }
    if(!findUser) {
      res.status(404).json({
        message: 'admin not found',
      })
    }
  } catch (error) {
    console.log(error);
  }
};
