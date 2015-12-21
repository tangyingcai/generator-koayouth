
/**
 * Module dependencies.
 */

var render = require('./lib/render');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var app = koa();

// "database"

var posts = [];

// middleware

// serve files from ./public
app.use(serve(__dirname + '/public'));

app.use(logger());

// route middleware

app.use(route.get('/', index));
app.use(route.get('/list', list));
app.use(route.get('/post/new', add));
app.use(route.get('/post/:id', show));
app.use(route.post('/post', create));

// route definitions

/**
 * Post listing.
 */

function *index() {
  this.body = yield render('index', { posts: posts });
}

/**
 * Post listing.
 */

function *list() {
  this.body = yield render('list', { posts: posts });
}

/**
 * Show creation form.
 */

function *add() {
  this.body = yield render('new');
}

/**
 * Show post :id.
 */

function *show(id) {
  var post = posts[id];
  if (!post) this.throw(404, 'invalid post id');
  this.body = yield render('show', { post: post });
}

/**
 * Create a post.
 */

function *create() {
  var post = yield parse(this);
  var id = posts.push(post) - 1;
  post.created_at = new Date;
  post.id = id;
  this.redirect('/');
}

app.listen(3000);
