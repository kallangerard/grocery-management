import express from 'express';
import pool from '../models/pool';

const router = express.Router();

router.get('/', function (req, res, next) {
  return res.status(200).json({ products: 'products' });
});

export default router;
