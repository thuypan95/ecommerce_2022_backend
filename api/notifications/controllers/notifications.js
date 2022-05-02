'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const getComment = async (id) => {
  return await strapi.services.comments.findOne({ id: id })
}
module.exports = {

  find: async (ctx) => {
    const notify = await strapi.services.notifications.find(ctx.request.query);
    for (let i = 0; i < notify.length; i++) {
      if (notify[i].comment !== null)
        notify[i].fullComment = await getComment(notify[i].comment?.id);
    }
    return notify;
  },
  create: async (ctx) => {
    const { comment, order } = ctx.request.body;
    let notify;
    if (ctx.request.body.comment !== null) {
      const { id } = comment;
      const fullRev = await getComment(id);
      notify = await strapi.services.notifications.create({
        comment: comment,
      });
      notify.fullComment = fullRev;
    }
    else {
      notify = await strapi.services.notifications.create({
        order: order,
      });
    }
    return notify;
  },
  async update(ctx) {
    console.log(ctx.request.body);
    // some logic here
    let listNotify = [];
    if (ctx.request.body.productID !== null) {
      console.log('vo ha')
      const product_id = ctx.request.body.productID;
      listNotify = await strapi.services.notifications.find();
      for (let i = 0; i < listNotify.length; i++) {
        if (listNotify[i].comment?.product === product_id) {
          await strapi.services.notifications.update({ id: listNotify[i].id }, { read: true })
        }
      }
    }
    else {
      await strapi.services.notifications.update({ id: ctx.request.body.id }, { read: true })
    }

    return listNotify;
  }

};
