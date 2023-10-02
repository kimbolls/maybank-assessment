// dotenvConfig.js
const dotenv = require('dotenv');

// Load environment variables from the appropriate .env file
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });
