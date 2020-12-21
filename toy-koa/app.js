const http = require("http");
const response = require("./response");
const context = require("./context");
const request = require("./request");

module.exports = class {
  constructor() {
    this._middlewares = [];
  }

  use(middleware) {
    this._middlewares.push(middleware);
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      try {
        const ctx = this._createContext(req, res);
        const fn = this._compose(...this._middlewares);
        await fn(ctx);
        res.end(ctx.body);
      } catch (e) {
        console.error(e);
      }
    });
    server.listen(...args);
  }

  _createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  _compose(...args) {
    return (ctx) => {
      return dispatch(0);
      function dispatch(i) {
        const fn = args[i];
        return fn
          ? Promise.resolve(fn(ctx, () => dispatch(i + 1)))
          : Promise.resolve();
      }
    };
  }
};
