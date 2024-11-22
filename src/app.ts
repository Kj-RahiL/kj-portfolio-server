/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import cookieParser from 'cookie-parser';
import notFound from './app/middlewares/notFound';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response) => {
  res.send(`
      <html>
        <head>
          <title>Recipe Sharing Community Server</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .content {
              text-align: justify;
              font-size: 36px;
              width: 80%; 
            }
          </style>
        </head>
        <body>
          <div class="content">
            Hurrayyyy...💨🕺💃!! Portfolio is running...
          </div>
        </body>
      </html>
    `);
});

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use(notFound);

export default app;
