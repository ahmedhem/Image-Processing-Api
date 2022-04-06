import app from '../../../app';
import supertest from 'supertest';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test resize an image', (): void => {
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
