const express = require('express');
const app = express();
const port = process.env.PORT || 1800;
const n8nRoutes = require('./src/n8n/routes');
const pgstream = require('./src/utils/pgstream');

const dbConfig = {
  postgresdb: {
    local: {
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 5432,
      database: process.env.DATABASE || 'mydatabase',
      user: process.env.USER || 'myuser',
      password: process.env.PASWWORD || 'mypassword',
      connectionTimeoutMillis: 20000,
      idleTimeoutMillis: 10000,
      max: 200
    }
  }
};




pgstream.init(dbConfig.postgresdb["local"])

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});
;

app.use('/api/v1', n8nRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

