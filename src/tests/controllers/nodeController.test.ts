import { Request, Response } from 'express';

import { getNodes, createNode, updateNode } from '../../controllers/nodeController';
import nodeRepository from '../../repositories/nodeRepository';

jest.mock('../../repositories/nodeRepository', () => ({
  __esModule: true,
  default: {
    first: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    getSubtreeFromNodeId: jest.fn(),
  },
}));

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('getNodes', () => {
  it('should return node subtree for valid node path', async () => {
    const nodeData = {
      id: 1,
      name: 'MockNode',
      parentId: null,
      properties: '',
    }
    const data = {
      ...nodeData,
      properties: {},
    }
    const node = { 
      ...nodeData,
      getProperties: jest.fn().mockReturnValue({}),
      getResponse: jest.fn().mockReturnValue(data),
    };

    (nodeRepository.first as jest.Mock).mockResolvedValue(node);
    (nodeRepository.getSubtreeFromNodeId as jest.Mock).mockResolvedValue([]);
    
    const req: Request = { query: { path: 'MockNode' } } as unknown as Request;
    const res: Response = mockResponse();

    await getNodes(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(node.getResponse).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ data: { ...data, children: [] } });
  });

  it('should return 404 if node not found', async () => {
    (nodeRepository.first as jest.Mock).mockResolvedValue(null);
    const req: Request = { query: { path: 'NonExistentNode' } } as unknown as Request;
    const res: Response = mockResponse();

    await getNodes(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Node not found' });
  });
});

describe('createNode', () => {
  it('should create a new node', async () => {
    const nodeData = {
      id: 2,
      name: 'NewNode',
      parentId: 1,
      properties: '',
    }
    const data = {
      ...nodeData,
      properties: {},
    }
    const newNode = { 
      ...nodeData,
      getProperties: jest.fn().mockReturnValue({}),
      getResponse: jest.fn().mockReturnValue(data),
    };

    (nodeRepository.getById as jest.Mock).mockResolvedValue({ id: 1 });
    (nodeRepository.create as jest.Mock).mockResolvedValue(newNode);

    const req: Request = { body: { name: 'NewNode', parentName: 'ParentNode', properties: {} } } as Request;
    const res: Response = mockResponse();

    await createNode(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(newNode.getResponse).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ data });
  });

  it('should return error if parent node not found', async () => {
    (nodeRepository.getById as jest.Mock).mockResolvedValue(null);
    const req: Request = { body: { name: 'NewNode', parentName: 'NonExistentParent', properties: {} } } as Request;
    const res: Response = mockResponse();

    await createNode(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Parent node not found' });
  });
});

describe('updateNode', () => {
  it('should update node properties', async () => {
    const properties = { Height: 100 };

    const nodeData = {
      id: 1,
      name: 'UpdatedNode',
      parentId: 1,
      properties,
    }
    const data = {
      ...nodeData,
      properties,
    }
    const updatedNode = { 
      ...nodeData,
      getProperties: jest.fn().mockReturnValue({}),
      getResponse: jest.fn().mockReturnValue(data),
    };

    (nodeRepository.update as jest.Mock).mockResolvedValue(updatedNode);

    const req: Request = { params: { id: '1' }, body: { properties } } as unknown as Request;
    const res: Response = mockResponse();

    await updateNode(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(updatedNode.getResponse).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ data });
  });
});
