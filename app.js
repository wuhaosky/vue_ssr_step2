const Vue = require("vue");
var koa = require("koa");
var app = new koa();
var Router = require("koa-router");
var router = new Router();
const renderer = require("vue-server-renderer").createRenderer();

app.use(router.routes()).use(router.allowedMethods());

router.get("*", function *(next) {
    const vm = new Vue({
        data: {
            url: this.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    });
    renderer.renderToString(vm, (err, html) => {
        if (err) {
            this.res.status(500).end("Internal Server Error");
            return;
        }
        this.res.end(`
            <!DOCTYPE html>
            <html lang="en">
                <head><title>Hello</title></head>
                <body>${html}</body>
            </html>
        `);
    });
});

app.listen(3000);
