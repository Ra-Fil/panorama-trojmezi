// CJS wrapper — avoids Node.js ESM path encoding bug with non-ASCII characters (í → %C3%AD)
require('tsx/cjs');
require('./server.ts');
