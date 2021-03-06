import createError, { HttpError } from 'http-errors';
import express, { Response, Request, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import authorsRouter from './routes/authors'
import cors from 'cors';
import 'dotenv/config';
import dotenv from 'dotenv'

dotenv.config()

import { connectTestDB,connectDB } from './utils/dbHandler.utils';

export const app = express();


app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', authorsRouter);





// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


if(process.env.NODE_ENV == 'test'){
  connectTestDB()
}else{
  connectDB()
}


export default app;
