# Amith Raravi's Blog - Version 2.0

![raravi](https://img.shields.io/github/license/raravi/amithraravi2.com)&nbsp;&nbsp;![raravi](https://img.shields.io/github/package-json/v/raravi/amithraravi2.com)&nbsp;&nbsp;![raravi](https://img.shields.io/circleci/build/github/raravi/amithraravi2.com)&nbsp;&nbsp;![raravi](https://img.shields.io/depfu/raravi/amithraravi2.com)&nbsp;&nbsp;![raravi](https://img.shields.io/github/last-commit/raravi/amithraravi2.com)&nbsp;&nbsp;![raravi](https://img.shields.io/website?url=https%3A%2F%2Fwww.amithraravi.com)

**My Personal Website**: This repo holds the source-code of my website www.amithraravi.com, in order to track the changes.

Warning: This is a work in progress...
---

## Notable Features

* [Jekyll](https://github.com/jekyll/jekyll) 4.x and GitHub Pages compatible.
* Stylesheet built using [Sass](https://sass-lang.com/).
* Data files for easier customization of the site navigation/footer and for supporting multiple authors.
* Comments using PHP script, table of contents, social sharing links, and Google AdSense ads.
* [Docker](https://www.docker.com/) container for local development.
* [CircleCi](https://circleci.com/) integration for Continuous Integration / Continuous Delivery (CI/CD): On every commit, CircleCi workflow will run build and deploy to the web server (right now, [Dreamhost](https://www.dreamhost.com/)).
* [Cypress](https://www.cypress.io/) for End-to-End testing.
* [Cloudflare](https://www.cloudflare.com/) as CDN for all, [Imagekit](https://imagekit.io/) for images.
* [Webpack](https://github.com/webpack/webpack) for bundling Javascript into a single file. Previously used [Grunt](https://github.com/gruntjs/grunt) for image optimisation / asset minification / javascript bundling.
* [Babel](https://github.com/babel/babel) for ES6 support.
* Keeping in mind the [WCAG](https://www.w3.org/WAI/tips/) 2.1 guidelines to be accessible by all, the website maintains the right color contrast, size of buttons, ARIA labels, and many more features under the hood.
