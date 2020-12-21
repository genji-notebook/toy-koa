const ToyKoa = require("./toy-koa/app");
const app = new ToyKoa();

// sync middlewares
app.use(async (ctx, next) => {
  ctx.body = "Hello";
  await next();
});

// async middleware
app.use(async (ctx, next) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
  ctx.body += " Toy Koa";
  await next();
});

// router middleware
const Router = require("./middlewares/router");
const router = new Router();
router.get("/index", async (ctx) => (ctx.body = "index page"));
router.get("/post", async (ctx) => (ctx.body = "post page"));
router.get("/list", async (ctx) => (ctx.body = "list page"));
app.use(router.routes());

// static middleware
const static = require("./middlewares/static");
const server = static(__dirname, "/static");
app.use(server);

const port = 8000;
app.listen(port, "0.0.0.0", () =>
  console.log(`Start listening on http://localhost:${port}`)
);
