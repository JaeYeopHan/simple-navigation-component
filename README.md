# Component_development_practice
Component development practice repository

## Use
```js
    const list = new ListComponent(api, '#list');
    const nav = new NavComponent(api, 'nav');
    nav.on('buildNav', function(data) {
        list.render(data);
    });
```

## Description
* jQuery (just for ajax)
* handlebars
* mocha/chai for test
* Webpack (for bundle and minify)
  * handlebars-loader
  * babel-loader
* event-emitter
* bootstrap

### Futhermore
* Remove jQuery
  * Ajax => fetch API or axios
* html file uglify, minify
* css and bootstrap uglify, minify
* Apply Travis CI
* Add karma
* Add istanbul
* Add Unit Test

