'use strict';

/**
 * original-citizen service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::original-citizen.original-citizen');
