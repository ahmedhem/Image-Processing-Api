import express, { Router } from 'express';
import resize from './images/resize';

const routes: Router = express.Router();

routes.use('/images/resize', resize);
export default routes;
