# Navigation Component
[![Build Status](https://travis-ci.org/JaeYeopHan/Navigation_Component.svg?branch=master)](https://travis-ci.org/JaeYeopHan/Navigation_Component)  

**This is Navigation component.**  
Simply pass api and the id value of the html you want to specify as root, and the `renderOption` to complete the navigation.

## Demo
You can see the demo with list component in [demo-branch](https://github.com/JaeYeopHan/Navigation_Component/tree/demo-branch)  
`X`: Clickable / `O`:  Not clickable
#### Case 1
| 이전 | << | >> | 다음 |
|:-:|:-:|:-:|:-:|
| X | X | O | O |

![](/DEMO_IMAGE/demo_1.png)

#### Case 2
| 이전 | << | >> | 다음 |
|:-:|:-:|:-:|:-:|
| X | O | O | O |

![](/DEMO_IMAGE/demo_2.png)

#### Case 3
| 이전 | << | >> | 다음 |
|:-:|:-:|:-:|:-:|
| O | O | O | X |

![](/DEMO_IMAGE/demo_3.png)

#### Case 4
| 이전 | << | >> | 다음 |
|:-:|:-:|:-:|:-:|
| O | O | X | X |

![](/DEMO_IMAGE/demo_4.png)

</br>

## Usage
```js
const nav = new NavComponent(api, '#nav');
nav.on('buildNav', data => {
    //TODO attach event
});

```
Also,
```js
const nav = new NavComponent(api, '#nav', {
    countOfItem: 5,
    countOfIndex: 3
});
```

### **Notice!**
If the `renderOption` passed to the two each components is different, an error occurs. You can check it in tool for developer of browser.
```js
// default renderOption
{
  countOfItem: 3, // Number of items to render on one page
  countOfIndex: 5 // Number of pagination about items
}
```

### API Design in component
* To fetch value to count of data
  * `[Domain Address]/count`

</br>

## Install
```
> git clone https://github.com/JaeYeopHan/Navigation_Component nav
> cd nav
> yarn add //or npm install
> npm run dev
```

</br>

## Dependency
* axios
* handlebars
* mocha / chai / chai-http
* Webpack2
  * eslint-loader(pre)
  * handlebars-loader
  * babel-loader
* ESLint
  * airbnb-base
* event-emitter
* Travis CI
* bootstrap

</br>

## TODO
* [ ] Redesign cache algorithm with TTL 
* [ ] Add Unit Test 
* [ ] html file uglify, minify
* [ ] css uglify, minify(with textExtract)
* [ ] tree shaking (webpack)
* [ ] Add karma
* [ ] Add istanbul
* [ ] Add Cross-browsing status
