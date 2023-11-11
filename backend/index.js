import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cookies from 'cookie-parser';
import { EMPLOYEES } from './static/employees.js';
import { INTERESTS } from './static/interests.js';
import { USER } from './static/user.js';

const app = express();
const port = 8080;

app.use(cors({}));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cookies());

const VALID_LOGIN = 'admin';
const VALID_PASSWORD = 'admin';
const SECRET = 'secret';

app.post('/login', (req, res) => {
  if (req.body.login === VALID_LOGIN && req.body.password === VALID_PASSWORD) {
    const userEmployee = EMPLOYEES.find((e) => e.id === USER.id);
    const response = {
      id: userEmployee.id,
      firstName: userEmployee.firstName,
      lastName: userEmployee.lastName,
      position: userEmployee.position,
      profilePicture: userEmployee.profilePicture,
    };

    const token = jwt.sign(response, SECRET, { expiresIn: '24h' });

    return res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 }).json({
      userData: response,
      token,
    });
  }

  res.status(401).json({
    message: 'Invalid credentials',
  });
});

app.get('/user', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  try {
    const userData = jwt.verify(token, SECRET);

    return res.json({
      userData,
    });
  } catch (e) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
});

app.get('/employees', (req, res) => {
  return res.json({
    employees: EMPLOYEES.map((employee) => ({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      position: employee.position,
      profilePicture: employee.profilePicture,
    })),
  });
});

app.get('/employees/:id', (req, res) => {
  const employee = EMPLOYEES.find((employee) => employee.id === Number(req.params.id));
  if (!employee) {
    return res.status(404).json({
      message: 'Not found',
    });
  }
  return res.json({
    ...employee,
  });
});

app.get('/static/interests', (req, res) => {
  return res.json({
    interests: INTERESTS,
  });
});

app.use('/files', express.static('files'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
