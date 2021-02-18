import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import Debug from 'debug';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';

import { upcLookupRouter } from './routes/upcLookupRoute';

const debug = Debug('app');

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

app.use('/upc', upcLookupRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Not Implemented' });
});

const port = process.env.PORT || 3001;

mongoose.connection
  .on('connected', function () {
    debug(chalk.blue('Connected', process.env.MONGODB_URI));
  })
  .on('error', function (err) {
    debug(chalk.red('Error', process.env.MONGODB_URI));
    if (err) {
      debug(chalk.red(err));
    }
  })
  .on('disconnected', function () {
    debug(chalk.blue('\nDisconnected', process.env.MONGODB_URI));
  })
  .on('open', function () {
    debug(chalk.blue('Opened', process.env.MONGODB_URI));

    app.listen(port, () => {
      debug(`listening on port ${chalk.green(port)}`);
    });
  });

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
} else {
  debug(chalk.red('Error mongodb://.env'));
  debug(chalk.red('Error http://.env'));
}
