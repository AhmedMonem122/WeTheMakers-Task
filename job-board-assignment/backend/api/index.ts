import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../src/main';

let cachedApp: any;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('Handler called:', req.method, req.url);
    
    if (!cachedApp) {
      console.log('Initializing NestJS app...');
      cachedApp = await createApp();
      await cachedApp.init();
      console.log('NestJS app initialized');
    }

    // Strip /api prefix if present (Vercel routes /api/* to this function)
    const originalUrl = req.url || '';
    const cleanUrl = originalUrl.startsWith('/api') 
      ? originalUrl.replace(/^\/api/, '') || '/' 
      : originalUrl;
    
    req.url = cleanUrl;
    console.log('Processed URL:', cleanUrl);

    const httpAdapter = cachedApp.getHttpAdapter();
    const expressApp = httpAdapter.getInstance();
    
    expressApp(req, res);
  } catch (error: any) {
    console.error('Error in Vercel handler:', error);
    console.error('Stack:', error?.stack);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error?.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}

