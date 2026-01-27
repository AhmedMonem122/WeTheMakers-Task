import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../src/main';

let cachedApp: any;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!cachedApp) {
      cachedApp = await createApp();
      await cachedApp.init();
    }

    const httpAdapter = cachedApp.getHttpAdapter();
    const expressApp = httpAdapter.getInstance();
    
    expressApp(req, res);
  } catch (error: any) {
    console.error('Error in Vercel handler:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error?.message || 'Unknown error' 
    });
  }
}

