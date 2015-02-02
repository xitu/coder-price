var Vue = require('vue');
var appOptions = require('./app.vue');
var app = new Vue(appOptions).$mount('body');

console.log(app.title);