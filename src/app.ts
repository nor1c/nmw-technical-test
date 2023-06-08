import { PORT } from './env.json';
import 'source-map-support/register';
import express, { Express, Request, Response, NextFunction } from "express";
import createError from "http-errors"
import path from "path";
import cors from "cors";
import compression from "compression";
import serveStatic from "serve-static";
import router from "./routes";
import MongoClient from './infra/mongo.connect';

const app: Express = express();

app.set('trust proxy', true);
app.use(cors());
app.use(express.json({
  type: [
    'application/json',
    'application/csp-report',
    'application/reports+json'
  ]
}));
app.use(express.urlencoded({ extended: false }));
app.use(serveStatic(path.join(__dirname, '../public')));
app.use(compression());


new MongoClient().connect()

app.use(router);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404))
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    next(createError(500, err))
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {},
  });
});

app.set("port", PORT);
app.listen(app.get("port"));
