'use strict';

/**
 * mid-gen service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mid-gen.mid-gen');
