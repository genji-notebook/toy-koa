# Toy Koa

This a simple version of Koa. It is just for learning purpose which can't be used directly in a production environment.

## Get Started

```js
const ToyKoa = require('./toy-koa/app.js');
const app = new ToyKoa();

app.use(ctx => {
    ctx.body = 'Hello ToyKoa';
})

app.listen(3000);
```

## API

- `new ToyKoa()`
- `app.use(callback: (ctx, next) => {})`
- `app.listen(port, address, callback)`
