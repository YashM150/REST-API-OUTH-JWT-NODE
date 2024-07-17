'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport'); // Ensure this file is correct
const authRoutes = require('./api/routes/authRoutes');
const userRoutes = require('./api/routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
require('dotenv').config(); // Load environment variables

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize()); // Correctly initialize Passport

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Load the swagger.yml file
const swaggerDocument = YAML.load(path.join(__dirname, 'api', 'swagger', 'swagger.yaml'));
// Serve the Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
