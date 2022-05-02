async function createComment({ comment_content, users_permissions_user, product, parent_id, name_reply_to }) {
  try {
    const comment = await strapi.services.comments.create({
      comment_content, users_permissions_user, product, parent_id, name_reply_to
    },
    );
    return comment;
  } catch (err) {
    console.log({ err });
    return { err: "Comment cannot be created. Try again" };
  }
}
module.exports = {
  createComment,
};
