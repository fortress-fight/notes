// var a = document.getElementById('dome');
// console.log(a);
// var newApp = document.createElement('h1');
// newApp.innerHTML = '这是第一个webpack ser';
// a.appendChild(newApp);
//
// require('./first.js')
// require('./style.css')
var Vue = require('vue');
console.log(Vue);
new Vue({
    el: "body",
    data: {
        message: "hello vue.js"
    }
});
