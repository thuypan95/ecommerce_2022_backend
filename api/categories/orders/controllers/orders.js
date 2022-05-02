'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const stripe = require("stripe")("sk_test_8QqUtzpUE3cYmNzrxZn4mnXJ00UUEojKtY");

module.exports = {
  create: async (ctx) => {
    const { address, amount, dishes, token, city, state } = ctx.request.body;
    const stripeAmount = Math.floor(amount * 100);
    //charge on stripe

    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: stripeAmount,
      currency: "usd",
      description: `Order ${new Date()} by ${ctx.state.user.username}`,
      source: token,
    });
    console.log(charge.id);
    // Register the order in the database
    const order = await strapi.services.orders.create({
      user: ctx.state.user.id,
      charge_id: charge.id,
      id: charge.id,
      amount: 1,
      address,
      dishes,
      city,
      state,
    });

    return order;
  },
};
