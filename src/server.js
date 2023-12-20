const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const cors = require('cors');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const customer = require('./app/models/categories');

const route = require('./routes/index');
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/hash-password', (req, res) => {
  const password = 'Huyen@123';
  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  res.json({
    salt: salt,
    hashedPassword: hash,
  });
});


//HTTP logger
// app.use(morgan('combined')); //tạm thời ẩn cái này

//Template engine
app.engine('handlebars', handlebars.engine());
// app.engine('handlebars',handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

// console.log('PATH: ',path.join(__dirname, 'resources', 'views'));


//Route init
route(app);

//Home, search, contact

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
