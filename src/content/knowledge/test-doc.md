---
title: "Test Doc"
---

# Testing all markdown styles in single doc

below is 3 quote without any codestyle - plaintext
```
git config --global user.name "xyz"
git config --global user.email "xyz"
```

with java code style
```java
System.out.println("Hi Java");
```

with javascript code style
```js
const http = require('http');
const server = http.createServer((req, res) => {
	console.log(req);
	process.exit();
})
```

## This is H2

below is single quote which can be used inline `git init demo`

more inline quote
`||` returns the first truthy value.
`??` returns the first defined value.

below is > symbol
> present working directory

this line should be after empty line to be detached from `>`

This is a [link](https://reactrouter.com/en/main)

### This is H3

Below numbered list with Bold headings
1. **Performance**: Every time a component is rendered in React, all inline functions are recreated. This can lead to slower performance in your application, especially if you have many components with inline functions.
2. **Maintenance**: Inline functions are defined within the component and cannot be reused in other parts of the application. This can make the code more difficult to maintain as the application grows.
3. **Readability**: Inline functions can make code more difficult to read and understand, especially if they are long or have many arguments.


Table of difference between Let and Var
|var|let|
|---|---|
|It has been available from the beginning of JavaScript|Introduced as part of ES6|
|It has function scope|It has block scope|
|Variable declaration will be hoisted|Hoisted but not initialized|
|It is possible to re-declare the variable in the same scope|It is not possible to re-declare the variable|

**Note:** If you want to encode characters such as `/ ? : @ & = + $ #` then you need to use `encodeURIComponent()`
