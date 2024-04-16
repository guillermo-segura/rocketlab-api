import express, { Request, Response } from 'express';
import { getNodes, createNode, updateNode } from '../controllers/nodeController';

const router = express.Router();

// curl -v http://localhost:3000/nodes?path="Rocket/Stage2"
router.get('/nodes', getNodes);

// curl -X POST -H "Content-Type: application/json" -d '{"name": "Engine3", "parentName": "Stage2"}' http://localhost:3000/nodes
router.post('/nodes', createNode);

// curl -X PATCH -H "Content-Type: application/json" -d '{"properties": {"Height": 18000, "Mass": 12000000, "Speed": 23000}}' http://localhost:3000/nodes/1
router.patch('/nodes/:id', updateNode);

export default router;
