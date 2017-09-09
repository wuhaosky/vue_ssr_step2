const Vue = require("vue");
// koa
var koa = require("koa");
var server = new koa();

// koa-static
const staticServer = require('koa-static');
server.use(staticServer(__dirname + '/dist'));

// koa-router
var Router = require("koa-router");
var router = new Router();
server.use(router.routes()).use(router.allowedMethods());

// ssr renderer
const renderer = require("vue-server-renderer").createRenderer();

// Server-Side Bundle File
const createApp = require("./dist/bundle.server.js")["default"];

// Client-Side Bundle File
const clientBundleFileUrl = '/bundle.client.js';

router.get("*", function*(next) {
    let ctx = this;
    const context = { url: ctx.url };

    createApp(context).then(app => {
            renderer.renderToString(app, (err, html) => {
                if (err) {
                    ctx.status = 500;
                    ctx.body = `
                        <h1>Error: ${err.message}</h1>
                        <pre>${err.stack}</pre>
                    `;
                    return;
                } else {
                    ctx.status = 200;
                    ctx.body = `
                        <!DOCTYPE html>
                        <html lang="zh-CN">
                        <head>
                            <meta charset="utf-8"/>
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
                        
                            <title>vue ssr step2</title>
                            <meta name="description" content=""/>
                            <meta name="format-detection" content="telephone=no">
                            <meta name="format-detection" content="email=no"/>
                        </head>
                        <body>
                            <div id="app">
                            ${html}
                            </div>
                            <script>window.__INITIAL_STATE__ = ${JSON.stringify(context.state)}</script>
                            <script src="${clientBundleFileUrl}"></script>
                        </body>
                        </html>
                    `;
                }
            });
        }).catch(err => {
            if (err.code === 404) {
                ctx.status = 404;
                ctx.body = "Page not found";
            } else {
                ctx.status = 500;
                ctx.body = "Internal Error";
            }
            process.exit(1);
        }
    );
});

server.listen(3000);
