## generator-koayouth
基于koa , PostCSS 框架的mvn脚手架.

参照 [generator-koa](https://github.com/peter-vilja/generator-koa)
实现的 koaYouth 脚手架.
> A [koaYouth](https://github.com/SineLabo/youth.git) generator for [Yeoman](http://yeoman.io).

    .

    ├── app
    │   └── controllers
    |       └── messages.js
    │   └── lib
    |       └── render.js
    │   └── view
    │        └── layout.html
    |        └── list.html
    ├── public
    │    ├── js
    │    └── css
    |       └── style.css
    ├── src
    │   └── js
    │   └── css
    |       └── style.css
    ├── app.js
    ├── gulpfile.js
    └── package.json
    └── .stylelintrc



### Getting started
> npm install -g yo

> npm install -g generator-koayouth

Make a new directory and cd into it:
> mkdir new-project && cd $_

> yo koayouth


### Start
> gulp
