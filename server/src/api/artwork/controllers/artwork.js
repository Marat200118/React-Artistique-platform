"use strict";

/**
 * artwork controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::artwork.artwork", ({ strapi }) => ({
  async create(ctx) {
    const newArtwork = await strapi.service("api::artwork.artwork").create(ctx);
    const sanitizedArtwork = await this.sanitizeOutput(newArtwork, ctx);
    ctx.body = sanitizedArtwork;
  },
}));
