### Backend Development

#### API spec

##### Create Node
Create a node with a specified parent.

- **URL**: `/nodes`
- **Method**: `POST`
- **Request Body**:
  - `name:`: Name of the new node record.
  - `properties`: Properties of the new node record.
  - `parentId`: Id of the parent node where the new node will hang.
- **Response**:
  - `201 OK`: Returns the new node object.
  - `404 Parent node not found`: If the parent node is not found based on the parentName provided.
  - `500 Server error`: If there is any issue during the record creation process.

##### Update Node
Add a property on a specific node.

- **URL**: `/nodes/:id`
- **Method**: `PATCH`
- **URL Parameters**:
  - `id`: The node to update.
- **Request Body**:
  - `properties`: The new properties of the node.
- **Response**:
  - `200 OK`: Returns the updated node object.
  - `500 Server error`: If there is any issue during the record update process.

##### Get Node
Return the subtree of nodes with their properties for a provided node path.

- **URL**: `/nodes`
- **Method**: `GET`
- **URL Parameters**:
  - `path`: The node path used to determine which subtree to return. Requests without a path will retrieve the full tree.
- **Response**:
  - `200 OK`: Returns the subtree in JSON format.
  - `404 Node not found`: If a node in the path provided is not found.

#### Resources used

- [How to setup TypeScript with Node.js and Express](https://dev.to/cristain/how-to-set-up-typescript-with-nodejs-and-express-2023-gf)
- [Top 6 ORMs for modern Node.js](https://amplication.com/blog/top-6-orms-for-modern-nodejs-app-development)
- [Prisma docs](https://www.prisma.io/docs/getting-started)
- [Prisma code examples](https://github.com/prisma/prisma-examples/)
- [TypeORM docs](https://typeorm.io/)
- [How to seed Database using TypeORM](https://dev.to/franciscomendes10866/how-to-seed-database-using-typeorm-seeding-4kd5)
- [Sequelize docs](https://sequelize.org/docs/v6/)
- [Sequelize code example](https://github.com/willjw3/sequelize-typescript-tutorial/blob/main/models/index.ts)
- [Solved: Cannot use import statement out of module](https://kinsta.com/knowledgebase/cannot-use-import-statement-outside-module/#:~:text=This%20error%20usually%20occurs%20in,import%20statement%20causes%20the%20error.)
- [ts-jest/utils missing](https://stackoverflow.com/questions/72960399/ts-jest-utils-missing)
- [express validators](https://express-validator.github.io/docs/guides/getting-started)

#### Overview

This challenge will test the following skills:

- NodeJS environment
- Typescript proficiency
- Relational databases
- REST APIs

Allow at least 3 hours to complete

Do not be discouraged if you are unable to complete aspects of the challenge, it is designed to test all levels of ability

#### Rules

- Complete the challenge(s) on your own
- Referencing of online resources is expected
- All code, markup, and assets should be pushed to the provided repository
- You are encouraged to ask us questions at any point
- Note any deviations from the specification
- You may use any supporting library you deem appropriate

#### Instructions

1.  Set up a NodeJS Typescript project
2.  Create a relational database with a schema for the following data structure:

- A rocket (root node) is built from a tree of nodes. Each node has a name. The path of a node can be inferred from the name hierarchy (e.g. _'/root/parent/child'_).
- Each node can have any number of properties. A property is a key value pair, where the key is a string and the value is a decimal number.

3.  Develop a way of interacting with this database in the NodeJS project. You may use an ORM of your own choice
4.  Seed the database with the following structure (entries with values are properties, others are nodes):

- Rocket
  - Height: 18.000
  - Mass: 12000.000
  - Stage1
    - Engine1
      - Thrust: 9.493
      - ISP: 12.156
    - Engine2
      - Thrust: 9.413
      - ISP: 11.632
    - Engine3
      - Thrust: 9.899
      - ISP: 12.551
  - Stage2
    - Engine1
      - Thrust: 1.622
      - ISP: 15.110

5.  Expose HTTP endpoints for the following operations:

    1.  Create a node with a specified parent
    2.  Add a property on a specific node
    3.  Return the subtree of nodes with their properties for a provided node path

6.  Create unit tests for endpoint **3** above.
