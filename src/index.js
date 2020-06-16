/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const volleyball = require('volleyball');
const cors = require('cors');
const chalk = require('chalk');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

const {
  PORT,
  DB_URL,
  ROOT_EMAIL,
  ROOT_PASSWORD,
} = process.env;

const Admin = require('./model/Admin');

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log(chalk.cyanBright('Database connected successfully 🙌'));
    const checkRoot = await Admin.findOne({
      email: ROOT_EMAIL,
    });
    if (!checkRoot) {
      const username = 'root';
      const fullName = 'root';
      const hash = await bcrypt.hashSync(ROOT_PASSWORD, 12);
      const rootAdmin = new Admin({
        email: ROOT_EMAIL,
        password: hash,
        fullName,
        isAdmin: true,
        isRoot: true,
        username,
      });
      const createRoot = rootAdmin.save();
      if (createRoot) {
        console.log(chalk.whiteBright.greenBright('Root user created 🎉'));
      }
    }
  })
  .catch((err) => {
    console.log(chalk.redBright(err));
  });

app.use(volleyball);
app.use(cors());
app.use(express.json());

const userRouter = require('./route/userRoute');
const adminRouter = require('./route/adminRoute');
const {
  notFound,
  errorHandler,
} = require('./error');

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    chalk.yellowBright(`Server started at http://localhost:${PORT} 🍏`),
  );
});
