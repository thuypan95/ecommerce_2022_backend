const stripe = require("stripe")("sk_test_8QqUtzpUE3cYmNzrxZn4mnXJ00UUEojKtY");

async function createOrder({ amount, dishes, info_shipping, token, note, user_token, user_id }) {
  try {
    const stripeAmount = Math.floor(amount * 100);

    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: stripeAmount,
      currency: "usd",
      description: `Order ${new Date()} by ${info_shipping.firstName} ${info_shipping.lastName}`,
      source: token,
    });
    var date = new Date();
    var components = [
      date.getYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ];
    var id = components.join("");
    // Register the order in the database
    const order = await strapi.services.orders.create({
      user_id,
      charge_id: charge.id,
      number_order: id,
      amount: amount,
      dishes,
      status: charge.status,
      note: note,
      info_shipping,
      user_token: user_token
    });
    return order;
  } catch (err) {
    console.log({ err });
    return { err: "Order cannot be created. Try again" };
  }
}
module.exports = {
  createOrder,
};
