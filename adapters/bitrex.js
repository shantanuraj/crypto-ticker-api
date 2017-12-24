/**
 * Bitrex response adapter
 */

const {
  pick,
} = require('../utils');

const adapt = pick('data.result.ask');
