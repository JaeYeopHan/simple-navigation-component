# navigation-component
[![Build Status](https://travis-ci.org/JaeYeopHan/Navigation_Component.svg?branch=master)](https://travis-ci.org/JaeYeopHan/Navigation_Component)  [![npm version](https://badge.fury.io/js/navigation-component.svg)](https://badge.fury.io/js/navigation-component)

**This is Navigation component.**  
Simply pass api and the id value of the html you want to specify as root, and the `renderOption` to complete the navigation.

## Feature
You can see the demo with list component in [demo-branch](https://github.com/JaeYeopHan/Navigation_Component/tree/demo-branch)  

### 1. Caching fetched data
Assuming that the data fetched from the api does not change, once fetched from the api, the data corresponding to that index is cached.

### 2. Activate buttons according to the situation
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

## LICENSE
MIT License

Copyright (c) 2017 Jbee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
