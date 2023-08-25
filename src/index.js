import express from 'express';
import 'dotenv/config';
import path, { dirname } from 'path'; // Added dirname import here
import { fileURLToPath } from 'url';

//routes
import custRouter from './routes/cust.route.js';

const app = express();

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(custRouter);

const port = process.env.SEVER_PORT;
app.listen(port, console.log('OK'));
