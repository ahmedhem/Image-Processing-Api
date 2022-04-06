import app from '../../../app';
import supertest from 'supertest';
import path from "path";
import {response} from "express";
import {resizeImage} from "../../../services/Image Utilites/resizeImage";
import * as fs from "fs";

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test resize an image', (): void => {

  it('test resizing', async (): Promise<void> => {
    const imagesDir:string = path.join(__dirname, '../../../../images/originalImages/');
    const outputDir:string = path.join(__dirname, '../../../../images/resizedImages/');
    const resize = new resizeImage(200, 1100, "fjord.jpg", imagesDir, outputDir);
    await resize.run();
    expect(fs.existsSync(path.join( __dirname,`../../../../images/resizedImages/${resize.newFileName}`))).toBe(true);
  });

  it('gets the api endpoint', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api');
    expect(response.status).toBe(404);
  });
  it('gets the resize image api endpoint with unfilled info', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images/resize'
    );
    expect(response.status).toBe(406);
  });
  it('gets the resize image api endpoint with correct filled info', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images/resize?width=200&height=500&fileName=fjord.jpg'
    );
    expect(response.status).toBe(200);
  });
  it('gets the resize image api endpoint with wrong  info', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images/resize?width=200&height=500&fileInfo=ffffjord.jpg'
    );
    expect(response.status).toBe(406);
  });
  it('gets the resize image api endpoint with already filled info', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images/resize?width=200&height=500&fileName=fjord.jpg'
    );
    expect(response.get('Statue')).toBe('alreadyCreated');
  });

});
