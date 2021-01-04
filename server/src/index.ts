import express, { Request } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import compression from 'compression';

import mutationsRouter from './routes/mutations/mutations';
import dgesRouter from './routes/dges/dges';
import splicingEventsRouter from './routes/splicingEvents/splicingEvents';
import transcriptUsagesRouter from './routes/transcriptUsages/transcriptUsages';

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

const clientBuildPath = path.join(__dirname, process.env.CLIENT_BUILD_PATH);

// Middlewares
app.use(express.static(clientBuildPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(compression());
app.use(cors<Request>());

// Setup Mongo
import './db/mongoose';

// Routes
app.use('/api/mutations', mutationsRouter);
app.use('/api/dges', dgesRouter);
app.use('/api/splicing-events', splicingEventsRouter);
app.use('/api/transcript-usages', transcriptUsagesRouter);

// Catch all for deploy
app.get('/*', (_req, res) => {
  res.sendFile(clientBuildPath + '/index.html', (err) => {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
