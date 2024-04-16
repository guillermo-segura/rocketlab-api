import request from 'supertest';

import app, { server } from '../../index';
import db from '../../models/index';

describe('Node Routes', () => {
  afterAll(async () => {
    if (server) {
      server.close();
    }
  });

  it('GET /nodes should return 200 and list of nodes when path is null', async () => {
    const response = await request(app).get('/nodes');
    expect(response.status).toBe(200);
  });

  it('GET /nodes should return 200 and list of nodes when path is not null', async () => {
    const response = await request(app).get('/nodes?Rocket/Stage1');
    expect(response.status).toBe(200);
  });

  it('POST /nodes should return 201 and create a new node', async () => {
    const newNodeData = { name: 'NewNode', parentId: 3, properties: {} };
    const response = await request(app)
      .post('/nodes')
      .send(newNodeData);

    expect(response.status).toBe(201);
  });

  it('POST /nodes should return 404 and not create a node when parent not found', async () => {
    const newNodeData = { name: 'NewNode', parentId: 999, properties: {} };
    const response = await request(app)
      .post('/nodes')
      .send(newNodeData);

    expect(response.status).toBe(404);
  });

  it('POST /nodes should return 500 and not create a node when data is not valid', async () => {
    const newNodeData = { name: null, parentId: 3, properties: {} };
    const response = await request(app)
      .post('/nodes')
      .send(newNodeData);

    expect(response.status).toBe(500);
  });

  it('PATCH /nodes/:id should return 200 and update an existing node', async () => {
    const existingNode = await db.Node.findOne({ where: { name: 'Stage1' } });
    const updatedNodeData = { properties: { Height: 18000, Mass: 12000000, Speed: 23000 } };
    const response = await request(app)
      .patch(`/nodes/${existingNode.id}`)
      .send(updatedNodeData);

    expect(response.status).toBe(200);
  });
});
