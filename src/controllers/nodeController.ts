'use strict';
import { Request, Response } from 'express';

import { getStringiedProperties } from '../utils/utils';
import { Node } from '../models/nodeModel';
import nodeRepository from '../repositories/nodeRepository';

export const getNodes = async (req: Request, res: Response) => {
  // IF PATH IS PROVIDED, RETURN SUBTREE; ELSE RETURN FULL TREE
  const path = typeof req.query?.path === 'string' ? req.query.path : 'Rocket';
  const nodeNames: string[] = path.split('/');

  let node: Node | null = null;

  // RETURN LAST NODE FROM NODE PATH OR 404
  for (let name of nodeNames) {
    node = await nodeRepository.first({ name, parentId: node ? node.id : null });
    if (!node) {
      res
        .status(404)
        .json({ message: 'Node not found' });
      return;
    }
  }

  if (node) {
    const subtree = await nodeRepository.getSubtreeFromNodeId(node.id);
    res
      .status(200)
      .json({
        data: {
          ...node.getResponse(),
          children: subtree,
        }
      });
  }
};

export const createNode = async (req: Request, res: Response) => {
  const { name, properties, parentId } = req.body;
  const parentNode =  await nodeRepository.getById(parentId);

  if (!parentNode) {
    res
      .status(404)
      .json({ message: 'Parent node not found' });
    return;
  }

  try {
    const newNode = await nodeRepository.create(
      name,
      getStringiedProperties(properties),
      parentNode.id
    );
  
    res
      .status(201)
      .json({ data: newNode.getResponse() });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }  
};
  
export const updateNode = async (req: Request, res: Response) => {
  const { properties } = req.body;

  try {
    const updatedNode = await nodeRepository.update(req.params.id, getStringiedProperties(properties));
    if (updatedNode) {
      res
        .status(200)
        .json({ data: updatedNode.getResponse() });
    } 
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
