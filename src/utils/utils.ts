'use strict';

import { Properties } from '../models/nodeModel';

export const getStringiedProperties = (properties: Properties | string): string => {
  if (!properties) {
    return '';
  }

  if (typeof properties === 'string') {
    return properties;
  }

  return JSON.stringify(properties);
}
