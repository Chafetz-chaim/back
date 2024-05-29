const crypto = require('crypto')

module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', 'd9b0dt66ff97a666027e665707b4e3e7'),
  },
  auth: {
    secret: env('ADMIN_JWT_SECRET', '77b2c07dbab4e1697bec244226fbd1b3'),
  },
  transfer: {
    token: {
      salt: crypto.randomBytes(16).toString('base64'),
    },
  },
});