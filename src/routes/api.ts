import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  return res.status(200).json({ message: 'Grocery Management API' });
});

export default router;
