'use strict'

module.exports = {
  findOne: async (ctx) => {
    const { id } = ctx.params;
    const entity = await strapi.services.products.findOne({ id });
    const copyEntity = { ...entity };
    copyEntity?.images.map(item => {
      const i = item.url;
      return item.url = `${strapi.config.get('server.url')}${i}`;
    })
    // return sanitizeEntity(copyEntity, { model: strapi.models.products });

    return copyEntity;
  },
};
