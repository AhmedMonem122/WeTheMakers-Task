import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../src/main';

let cachedServer: any;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cachedServer) {
    const app = await createApp();
    await app.init();
    const httpAdapter = app.getHttpAdapter().getInstance();
    cachedServer = httpAdapter;
  }

  return cachedServer(req, res);
}

