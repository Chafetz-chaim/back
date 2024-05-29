'use strict';

/**
 * places-of-residance service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::places-of-residance.places-of-residance');
