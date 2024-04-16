'use strict';
import { Model } from 'sequelize';

export interface NodeAttributes {
  id: number;
  name: string;
  properties: string;
  parentId: number | null;
}

export interface Properties {
  [key: string]: number;
}

export interface Node extends Omit<NodeAttributes, 'properties'> {
  properties: Properties | string;
  getProperties: () => Properties;
  getResponse: () => NodeResponse;
}

export interface NodeResponse extends Omit<NodeAttributes, 'properties'> {
  properties: Properties;
  createdAt: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Node extends Model<NodeAttributes> implements NodeAttributes {
    id!: number;
    name!: string;
    properties!: string;
    parentId!: number;
    createdAt!: string;
    updatedAt!: string;

    static async getSubtreeFromNodeId(nodeId: number): Promise<any> {
      const children = await Node.findAll({ where: { parentId: nodeId } });
    
      const childrenWithSubtrees = await Promise.all(
        children.map(async (child: Node) => {
          const subtree = await Node.getSubtreeFromNodeId(child.id);
          return {
            id: child.id,
            name: child.name,
            properties: child.getProperties(),
            createdAt: child.createdAt,
            children: subtree
          };
        })
      );
    
      return childrenWithSubtrees;
    }

    getProperties(): Properties {
      if (!this.properties) {
        return {};
      }
    
      if (typeof this.properties === 'object') {
        return this.properties;
      }
    
      return JSON.parse(this.properties);
    }

    getResponse(): NodeResponse {
      return {
        id: this.id,
        name: this.name,
        parentId: this.parentId,
        createdAt: this.createdAt,
        properties: this.getProperties(),
      }
    }

    static associate(models: any) {
      Node.belongsTo(models.Node, {
        onDelete: 'RESTRICT',
        foreignKey: 'parentId',
      });
    }
  };

  Node.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    properties: {
      // Only SQLite, MySQL, MariaDB, Oracle and PostgreSQL support DataTypes.JSON
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: false
    }
  }, {
    sequelize,
    modelName: 'Node',
  });

  return Node;
};