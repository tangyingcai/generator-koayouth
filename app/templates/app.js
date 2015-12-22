
/**
 * Module dependencies.
 */

var logger = require('koa-logger');
var serve = require('koa-static');
var router = require('koa-router')();
var parse = require('co-body');
var koa = require('koa');
var messages=require("./app/controllers/messages")

var app = koa();

// "database"

var posts = [];

// middleware

// serve files from ./public
app.use(serve(__dirname + '/public'));

app.use(logger());

// route middleware
router.get('/', messages.home);　
router.get('/messages', messages.list);　
router.get('/messages/:id', messages.fetch);　
router.post('/messages', messages.create);
router.get('/async', messages.delay);


app
.use(router.routes())
.use(router.allowedMethods());


app.listen(3000);
