import express from 'express';
import pool from '../models/pool';

const router = express.Router();

router.get('/', function (req, res, next) {
  
  res.send({ title: 'Express' });
});

export default router;
