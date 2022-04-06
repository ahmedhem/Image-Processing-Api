import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import routes from './routes/api';

dotenv.config();

const PORT = process.env.PORT;
const app: Application = express();

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.status(200);
  res.send(
    'Welcome to my image-processing-api project\n To use the project, please read the instruction in the readme file.'
  );
});

app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`);
});

export default app;
