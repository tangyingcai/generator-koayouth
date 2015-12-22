'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var KoaYouthGenerator = module.exports = function KoaYouthGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  this.basename = path.basename(process.cwd());
};

util.inherits(KoaYouthGenerator, yeoman.generators.Base);

KoaYouthGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  cb();
};

KoaYouthGenerator.prototype.app = function app() {

  this.mkdir('app/controllers');
  // this.mkdir('app/routes');
  this.mkdir('app/lib');
  this.mkdir('app/views');

  this.mkdir('public/js');
  this.mkdir('public/css');

  this.mkdir('src/js');
  this.mkdir('src/css');


  this.copy('messages.js', 'app/controllers/messages.js');
  this.copy('layout.html', 'app/views/layout.html');
  this.copy('list.html', 'app/views/list.html');
  this.copy('render.js', 'app/lib/render.js');

  this.copy('style.css', 'src/css/style.css');
  this.copy('main.css', 'src/css/main.css');
  this.copy('app.js', 'app.js');

  this.copy('gulpfile.js', 'gulpfile.js');
  this.copy('_package.json', 'package.json');
  this.copy('_gitignore', '.gitignore');
  this.copy('.stylelintrc', '.stylelintrc');
  this.copy('README.md', 'README.md');
};

KoaYouthGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
