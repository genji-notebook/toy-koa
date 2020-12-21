module.exports = class {
  constructor() {
    this.stack = [];
  }

  register(path, method, middleware) {
    this.stack.push({ path, method, middleware });
  }

  get(path, middleware) {
    this.register(path, "get", middleware);
  }

  post(path, middleware) {
    this.register(path, "post", middleware);
  }

  routes() {
    return async (ctx, next) => {
      const { url, method } = ctx;
      const { middleware } =
        this.stack.find(
          (item) => item.path === url && item.method.indexOf(method) >= 0
        ) || {};

      if (typeof middleware === "function") {
        middleware(ctx, next);
        return;
      }
      await next();
    };
  }
};
