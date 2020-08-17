const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  SECRET_KEY,
} = process.env;

const User = require('../model/User');

exports.Signup = async (req, res, next) => {
  try {
    console.log(req.body)
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
      const findUser = await User.findOne({
        $or: [{
          email,
        }, {
          username,
        }],
      });
      if (findUser) {
        res.status(409).json({
          message: 'User already exists, please log in.',
        });
      }
      if (!findUser) {
        const hash = await bcrypt.hashSync(password, 12);
        const userData = new User({
          fullName,
          email,
          password: hash,
          username,
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
    console.log(error)
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const {
      usernameOrEmail,
      password,
    } = req.body;

    const checkUser = await User.findOne({
      $or: [{
        email: usernameOrEmail,
      }, {
        username: usernameOrEmail,
      }],
    });
    if (!checkUser) {
      res.status(422).json({
        message: 'username/email or password invalid',
      });
    }
    if (checkUser) {
      const verifyPassword = await bcrypt.compareSync(password, checkUser.password);
      if (verifyPassword) {
        const {
          _id,
          username,
          email,
        } = checkUser;
        const token = jwt.sign({
          _id,
          email,
          username,
        }, SECRET_KEY, {
          expiresIn: '24h',
        });
        if (token) {
          res.status(200).json({
            message: 'logged in successfully 🎉',
            token,
          });
        }
      }
      if (!verifyPassword) {
        res.status(422).json({
          message: 'username/email or password invalid',
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.userData = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const user = await User.find({_id: _id});
    if (user) {
      const { fullName, email, _id, username } = user[0];
      const data = [{
        fullName,
        email,
        username,
        id: _id
      }]
      console.log(data)
      res.status(200).json({
        userData: data
      })
    }
    if (!user) {
      res.status(404).json({
        message: 'user not found'
      })
    }
  } catch (error) {
    next(error);
  }
}

exports.verifyUsername = async (req, res, next) => {
  try {
    const {
      username,
    } = req.body;
    const checkUsername = await User.findOne({
      username,
    });
    if (checkUsername) {
      res.status(400).json({
        data: checkUsername.email,
        message: 'Username already taken.',
      });
    }
    if (!checkUsername) {
      res.status(200).json({
        message: 'valid Username',
      });
    }
  } catch (error) {
    next(error);
  }
};
