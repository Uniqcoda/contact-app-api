import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import schema from './graphqlSchema';
// import compression from 'compression';
import graphQLHTTP from 'express-graphql';

import 'dotenv/config';

import contactRouter from './routes/contacts';
import blockedContactRouter from './routes/blockedContacts';

const app = express();

// Setup Request logging
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

app.use(
	morgan(logFormat, {
		skip: function(_req, res) {
			return res.statusCode < 400;
		},
		stream: process.stderr,
	})
);

app.use(
	morgan(logFormat, {
		skip: function(_req, res) {
			return res.statusCode >= 400;
		},
		stream: process.stdout,
	})
);

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// const localUri = "mongo://localhost/Contact App"
const uri = process.env.ATLAS_URI!;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

// use these for REST API
app.use('/contacts', contactRouter);
app.use('/blocked-contacts', blockedContactRouter);

// use this for fetching data with GraphQL
app.use(
	'/graphql',
	graphQLHTTP({
		schema,
		graphiql: true,
	})
);

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
	next(createError(404));
});

// error handler
app.use(function(err: any, req: express.Request, res: express.Response, _next: express.NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

export default app;
