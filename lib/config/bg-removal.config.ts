/**
 * Configuration for @imgly/background-removal
 * This file initializes the background removal engine
 */

import type { Config } from '@imgly/background-removal';

export const bgRemovalConfig: Partial<Config> = {
  debug: process.env.NODE_ENV === 'development',
  device: 'cpu', // Use CPU for server-side processing
  fetchArgs: {
    cache: 'force-cache',
  },
};
