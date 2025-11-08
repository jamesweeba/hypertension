const express = require('express');
const app = express();
const port =  1800;
const n8nRoutes = require('./src/n8n/routes');
const pgstream = require('./src/utils/pgstream');

const dbConfig = {
  postgresdb: {
    local: {
      host:'44.198.162.244'||'localhost',
      port: 5432,
      database:'hypertension_db'||'mydatabase',
      user: 'hypertension_db'||'myuser',
      password: 'POSTGRES-DBpass'||'mypassword',
      connectionTimeoutMillis: 20000,
      idleTimeoutMillis: 10000,
      max: 200
    }
  }
};


/*
ST: 44.198.162.244
      PORT: 5432
      DATABASE: hypertension_db
      USER: hypertension_db
      PASSWORD: POSTGRES-DBpass

*/




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

