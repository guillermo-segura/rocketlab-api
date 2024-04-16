'use strict';

import { NodeAttributes } from '../models/nodeModel';
import { getStringiedProperties } from '../utils/utils';

export const nodes: Partial<NodeAttributes>[] = [
  {
    id: 1,
    name: 'Rocket',
    properties: getStringiedProperties({
      Height: 18000,
      Mass: 12000000,
    }),
    parentId: null,
  },
  {
    id: 2,
    name: 'Stage1',
    properties: '',
    parentId: 1,
  },
  {
    id: 3,
    name: 'Stage2',
    properties: '',
    parentId: 1,
  },
  {
    id: 4,
    name: 'Engine1',
    properties: getStringiedProperties({
      Thrust: 9.493,
      ISP: 12.156,
    }),
    parentId: 2,
  },
  {
    id: 5,
    name: 'Engine2',
    properties: getStringiedProperties({
      Thrust: 9.413,
      ISP: 11.632,
    }),
    parentId: 2,
  },
  {
    id: 6,
    name: 'Engine3',
    properties: getStringiedProperties({
      Thrust: 9.899,
      ISP: 12.551,
    }),
    parentId: 2,
  },
  {
    id: 7,
    name: 'Engine1',
    properties: getStringiedProperties({
      Thrust: 1.622,
      ISP: 15.110,
    }),
    parentId: 3,
  }
];
