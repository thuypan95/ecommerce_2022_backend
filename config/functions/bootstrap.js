const { createComment } = require("../comment-database");
const { createOrder } = require("../order-database");
module.exports = () => {
  const io = require("socket.io")(strapi.server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", function (socket) {
    console.log('a user connected')

    // send message on user connection
    socket.on("addComment", async ({ comment_content, users_permissions_user, product, parent_id, name_reply_to }, callback) => {
      try {
        const comment = await createComment({
          comment_content, users_permissions_user, product, parent_id, name_reply_to
        });
        if (comment) {
          callback(comment);
          socket.broadcast.emit("newCommentAdded", { comment });
        }
      } catch (err) {
        console.log({ err });
        callback({ type: "error", message: err });
        console.log("Error occured. Please try again");
      }
    });
    socket.on("addOrder", async ({ amount, dishes, info_shipping, token, note, user_id }, callback) => {
      try {
        const order = await createOrder({
          amount, dishes, info_shipping, token, note, user_id
        });
        if (order) {
          callback(order);
          socket.broadcast.emit("newOrderAdded", { order });
        }

      } catch (err) {
        console.log({ err });
        callback({ type: "error", message: err });
        console.log("Error occured. Please try again");
      }
    });
    socket.on('disconnect', () => {
      console.log('a user disconnected')
    });

  });
}
