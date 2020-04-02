---
layout:     media
title:      "Bitcoin Converter"
date:       2020-01-26 21:00:00 +0530
modified:   
categories: portfolio
image:
  feature:  bitcoin.png
teaser:   bitcoin-400x250.png
---
A simple web-based bitcoin converter!

Source: [github](https://github.com/raravi/bitcoin-converter)

![license](https://img.shields.io/github/license/raravi/bitcoin-converter)&nbsp;&nbsp;![last-commit](https://img.shields.io/github/last-commit/raravi/bitcoin-converter)

This project demonstrates the use of [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) and [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). It fetches data from 2 different APIs: [blockchain.info](https://www.blockchain.com/api) & [fixer.io](https://fixer.io/)!

You can play around with this demo by replacing the script in `index.html` to point to any of the options below. Each is functionally equivalent, what changes is how the javascript code is written.

## 1. main.js

This is the default script. It supports a wide array of browsers, as it detects the feature(s) available and uses them accordingly.

## 2. main-es5.js

This file is written in classical style, using the `XMLHttpRequest` to fetch data from the APIs. The 'classical doom of hell' is visible here, along with multiple calls to the Error handling functionality. Here, the APIs have to be fetched sequentially.

## 3. main-es6.js

This uses the `Fetch API` (introduced in ES6) and the code is easier to read than before. The code also makes use of Promise chaining for easy maintenance. The APIs are fetched one after the other, mimicking calls to the `XMLHttpRequest` in the previous `main-es5.js` file.

## 4. main-es6-parallelfetch.js

This uses the `Fetch API` and `Promises`. Instead of calling the APIs one after the other, `Promise.all` is used to fetch the APIs in parallel.

## 5. main-es8.js

`async/await` (introduced in ES8) is used to fetch the APIs one after the other. The structure of `async/await` feels a lot cleaner and results in highly readable code.

## 6. main-es8-parallelfetch.js

`async/await` is used to fetch APIs concurrently using `Promise.all`. Readable and easier code, makes it quite easy to maintain.
