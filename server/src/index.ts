import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import compression from 'compression';

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
// @ts-ignore
app.use(cors());

// Catch all for deploy
app.get('/*', function (_req, res) {
  res.sendFile(clientBuildPath + '/index.html', function (err) {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});