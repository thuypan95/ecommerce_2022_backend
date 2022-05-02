module.exports = {
  async refreshToken(ctx) {
    const { token } = ctx.request.body;
    const payload = strapi.plugins['users-permissions'].services.jwt.verify(token);
    return strapi.plugins['users-permissions'].services.jwt.issue({ id: payload.id });
  }
}
