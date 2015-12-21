## generator-koaYouth
基于koa , PostCSS 框架的mvn脚手架.

A koaYouth generator for Yeoman.

参照 [generator-koa](http://koajs.com) 实现的 koaYouth 脚手架.
> A [koaYouth](https://github.com/SineLabo/youth.git) generator for [Yeoman](http://yeoman.io).


├── lib
│   └── render.js
├── controllers
│   └── messages.js
├── public
|   ├── js
|   └── css
|       └── style.css
├── src
|   └── js
|   └── css
|       └── style.css
├── views
|   ├── layout.html
|   └── list.html
├── app.js
├── gulpfile.js
└── package.json



### Getting started
> npm install -g yo

> npm install -g generator-koayouth

Make a new directory and cd into it:
> mkdir new-project && cd $_

> yo koayouth


> npm install

Or production
>npm install --production

### Start
> gulp
