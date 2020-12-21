const fs = require("fs");
const path = require("path");

function send(ctx, filepath) {
  const stats = fs.statSync(filepath);
  const { url } = ctx;
  if (stats.isDirectory()) {
    const dir = fs.readdirSync(filepath);
    const ret = ['<div style="padding-left:20px">'];
    dir.forEach((filename) => {
      const jump = path.join(url, filename);
      if (filename.indexOf(".") == -1) {
        ret.push(
          `<p><a style="color:black" href="${jump}">${filename}/</a></p>`
        );
      } else {
        ret.push(`<p><a href="${jump}">${filename}</a></p>`);
      }
    });
    ret.push("</div>");
    ctx.body = ret.join("");
  } else {
    const content = fs.readFileSync(filepath);
    ctx.body = content;
  }
}

module.exports = (dirPath, staticPath) => async (ctx, next) => {
  const { url } = ctx;
  if (url.indexOf(staticPath) !== 0) {
    await next();
    return;
  }

  const filepath = path.join(dirPath, url);
  
  try {
    
    send(ctx, filepath);
  } catch (e) {
    console.error(e);
    ctx.body = "404, not found";
  }
  await next();
};
