---
layout: article
title: "Gatsby and the 'window' variable"
author: amith_raravi
excerpt: "Where did the 'window' go? And how can I get it back?!"
date: 2020-01-24 16:06:00 +0530
modified:
categories: [articles, tech]
image: images/gatsby-logo.png
teaser: gatsby-window-400x250.png
---

If you have a Gatsby website, then you may have noticed the `window is not defined` error when you try to do `gatsby build`. Since there were quite a few queries regarding this, I thought of explaining the issue and how to fix it!

![image]({{ site.imagekiturl }}{{ site.images }}gatsby-logo.png)

## The Issue

Say you have a 3rd party JavaScript API on your site. When you’re developing the site using Gatsby, you won’t see any issues. Running `gatsby develop` will be successful. This makes you think that everything is fine. But when you try to build the static site using `gatsby build`, it will throw the `window is not defined` error.

> Why does `gatsby develop` run fine, but `gatsby build` throw an error for the same code?!

![image]({{ site.imagekiturl }}{{ site.images }}gatsby-window.png)

## `gatsby develop` vs `gatsby build`

During development, Gatsby will run the code in the browser where `window` is available. Everything runs fine and you are left feeling happy, but not for long though :(

During build, Gatsby compiles your code on the Server Side. i.e., Gatsby will compile your code using Webpack on the server, and hence `window` is not accessible. Webpack knows all the imported stuff that goes into your code during the build phase (remember the 3rd party API ?!), and when it can’t find `window` it stops the build process by throwing an error.

## The Fix!

The fix is to hide the `window` variable from Gatsby by doing a check for its existence. And move the offending code to the `ComponentDidMount()` function.

If you are importing a 3rd party API into your React component, then you should move the import to the `ComponentDidMount()` as well.

```jsx
componentDidMount() {

    var _this = this;
    if (typeof window !== `undefined`) {

      // import Isotope API
		const Isotope = require("isotope-layout/js/isotope");

      // init Isotope
      this.grid = new Isotope(`.${isotopeStyles.grid}`, {
        itemSelector: `.${isotopeStyles.elementItem}`,
        layoutMode: 'fitRows'
      });
    }
}
```

This should resolve the `window is not defined` error and you should be able to build your code successfully. If you need more information regarding this, check the Gatsby documentation on [Debugging HTML Builds](https://www.gatsbyjs.org/docs/debugging-html-builds/).
