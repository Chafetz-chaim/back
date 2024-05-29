'use strict';

/**
 * relative router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::relative.relative');
