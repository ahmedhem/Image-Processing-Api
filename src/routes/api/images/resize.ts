import express, { Router, Request, Response } from 'express';
import { query, validationResult } from 'express-validator';

const resize: Router = express.Router();

import path = require('path');
import fs = require('fs');
import {resizeImage} from "../../../services/Image Utilites/resizeImage";

const imagesDir:string = path.join(__dirname, '../../../../images/originalImages');
const outputDir:string = path.join(__dirname, '../../../../images/resizedImages/');

const fileNamesOriginal:string[] = fs.readdirSync(
  path.join(__dirname, '../../../../images/originalImages/')
);


resize.get(
  '/',
  [
    query('width').isNumeric(),
    query('height').isNumeric(),
    query('fileName').isIn(fileNamesOriginal),
  ],
  async (req: Request, res: Response):Promise<void> => {
    const errors = validationResult(req);
    if (errors.isEmpty() && parseInt(req.query.width as string) > 0 && parseInt(req.query.height as string) > 0) {
        try {
          res.set({ 'content-type': 'image/png' });
          res.status(200);

          const width: number = parseInt(req.query.width as string);
          const height: number = parseInt(req.query.height as string);
          const fileName: string = req.query.fileName as string;
          const r:resizeImage = new resizeImage(width, height, fileName, imagesDir, outputDir);
          const fileNamesCached:string[] = fs.readdirSync(
                path.join(__dirname, '../../../../images/resizedImages/')
            );

          if (fileNamesCached.includes(r.newFileName)) {
            res.sendFile(outputDir + r.newFileName);
            res.append('Statue', 'alreadyCreated');
          } else {
            res.append('Statue', 'Created');
            res.send(await r.run());
          }
        } catch (error) {
        }
    } else {
      res.status(406);
      res.send('resizing info are not correct.');
    }
  }
);

export default resize;
