import express from 'express';

export function GET(
  router: express.Router,
  url: string,
  handler: (req: any) => any,
) {
  router.get(
    url,
    async (req: express.Request, res: express.Response) => {
      try {
        const data = await handler(req);
        res.status(200).json({
          success: true,
          data,
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message || error });
      }
    },
  );
}

export function POST(
  router: express.Router,
  url: string,
  handler: (req: any) => any,
) {
  router.post(url, async (req: express.Request, res: express.Response) => {
    try {
      const data = await handler(req);
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message || error });
    }
  });
}
