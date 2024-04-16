'use strict';

import { Node } from '../models/nodeModel';
import db from '../models/index';

export const getById = async (id: number | string): Promise<Node | null> => {
  return await db.Node.findByPk(id);
};

export const first = async (where: any): Promise<Node | null> => {
    return await db.Node.findOne({ where });
  };

export const create = async (name: string, properties: string, parentId: number): Promise<Node> => {
  try {
    return await db.Node.create({
      name,
      parentId,
      properties,
    });
  } catch (err) {
    throw new Error('Error creating node');
  }
};

export const update = async (id: string | number, properties: string): Promise<Node | null> => {
  try {
    await db.Node.update({ properties }, { where: { id } });
    return await getById(id);
  } catch (err) {
    throw new Error('Error updating node');
  }
};

export const getSubtreeFromNodeId = async (id: number | string): Promise<any> => {
    return await db.Node.getSubtreeFromNodeId(id);
  };

export default { first, getById, create, update, getSubtreeFromNodeId };
