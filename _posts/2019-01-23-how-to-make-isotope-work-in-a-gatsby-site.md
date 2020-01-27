---
layout: article
title: "How to make Isotope work in a Gatsby site"
author: amith_raravi
excerpt: "Isotope.js implementation for grid filtering on a Gatsby generated React.js site."
date: 2019-01-23 16:06:00 +0530
modified:
categories: [articles, tech]
image: images/isotope.jpg
teaser: isotope-400x250.jpg
---

In my quest to learn [Gatsby.js](https://www.gatsbyjs.org/) and the underlying [React.js](https://reactjs.org/) library, I was porting my existing site into a Gatsby site. I had finished the basics and was turning towards the more complex parts of my site.

This is when I hit the wall, figuratively speaking. [Isotope.js](https://isotope.metafizzy.co/) is an external javascript resource that I have used to [animate the filtering of articles grid on my static site](https://www.amithraravi.com/articles/), and connect it to the component using [jQuery](https://jquery.com/). Gatsby being React based, I had to write a component which would take care of rendering as well as the callbacks required to sort/filter using Isotope. This is how I got it to work.

## Initial Setup

Before we delve into the solution, it’s better to understand the React basics that go into making it work.

* A [React component defined as an ES6 class](https://reactjs.org/docs/handling-events.html) usually implements event handler as a method of that class. This method has to be ‘bind’ed in the constructor for ‘this’ to work.
```jsx
constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
```
* Toggle the status of the buttons using the state of the component. The function this.setState() is used for this purpose.
```jsx
  constructor() {
    super();
    this.state = {
      isClicked: false
    };
  }
  handleClickAll(e) {
    this.setState({
      isClicked: true,
    });
  }
```
* Style can be [imported from CSS/SCSS](https://www.gatsbyjs.org/tutorial/part-two/#-build-a-new-page-using-css-modules) files into the React component and used as shown below:
```jsx
import styles from "./grid.module.scss";
...
...
      <div className={styles.filtersButtonGroup}></div>
...
...
```

Say we have 2 groups of items - **Tech** and **Personal** - which would mean we should have three filter states - **All**, **Tech** and **Personal** respectively. Hence, a React component which will have 3 buttons, each having a callback that sets the state of those buttons, can be written as:

```jsx
class GridFilter extends React.Component {
  constructor() {
    super();
    this.handleClickAll = this.handleClickAll.bind(this);
    this.handleClickTech = this.handleClickTech.bind(this);
    this.handleClickPersonal = this.handleClickPersonal.bind(this);
    this.state = {
      isClickedAll: true,
      isClickedTech: false,
      isClickedPersonal: false
    };
  }

  handleClickAll(e) {
    this.setState({
      isClickedAll: true,
      isClickedTech: false,
      isClickedPersonal: false
    });
  }

  handleClickTech(e) {
    this.setState({
      isClickedAll: false,
      isClickedTech: true,
      isClickedPersonal: false
    });
  }

  handleClickPersonal(e) {
    this.setState({
      isClickedAll: false,
      isClickedTech: false,
      isClickedPersonal: true
    });
  }

  render() {
    return (
      <div className={styles.filtersButtonGroup}>
        <button
          onClick={this.handleClickAll}
          className={
            this.state.isClickedAll
              ? classNames(styles.filtersButton, styles.isChecked)
              : styles.filtersButton
          }
        >
          All
        </button>
        <button
          onClick={this.handleClickTech}
          className={
            this.state.isClickedTech
              ? classNames(styles.filtersButton, styles.isChecked)
              : styles.filtersButton
          }
        >
          Tech
        </button>
        <button
          onClick={this.handleClickPersonal}
          className={
            this.state.isClickedPersonal
              ? classNames(styles.filtersButton, styles.isChecked)
              : styles.filtersButton
          }
        >
          Personal
        </button>
      </div>
    );
  }
}
```
<figcaption>Note: <a href="https://www.npmjs.com/package/classnames">classnames</a> is a simple JavaScript utility for joining classNames together that you can install using `npm`.</figcaption>

The **GridFilter** component renders a group of 3 buttons. Each button has a callback function for handling the click event. The callback functions are binded in the constructor (without which the call `this.handleClick` is not possible). The state variable is used to toggle the status of the buttons upon callback.

The 3 buttons as well as the `<div>` element containing them have classes - `isChecked`, `filtersButton` and `filtersButtonGroup` respectively. These are used to design the look of the buttons.

> What happens when you click a button?

> Does the button change its look?

> How does the user know the state of each button?

At a bare minimum, the <u>button that is clicked should look different compared to the other buttons in the grouping</u> (this is kind of self explanatory).

Note that the `state` variable has 3 variables in it. These store the status of the 3 buttons - `All`, `Tech` and `Personal`. Right now, only the status will get toggled on clicking the buttons. But they are supposed to do something more i.e., filter the posts in the grid and animate the action. This is where Isotope comes in.

## Install/Setup Isotope.js

First, install isotope using npm.

```bash
npm install --save isotope-layout
```

Then import it into your component.

```jsx
import Isotope from "isotope-layout/js/isotope";
```

If you have a pure `HTML` page containing a grid with the following hierarchy…

```html
<div class="grid">
	<div class="grid-item tech">Item 1</div>
	<div class="grid-item tech">Item 2</div>
	<div class="grid-item personal">Item 3</div>
	<div class="grid-item personal">Item 4</div>
</div>
```

In order to use Isotope on such a grid, initialize Isotope using the class names `grid` and `grid-items`.

```css
var iso = new Isotope( '.grid', {
  itemSelector: '.grid-item',
  layoutMode: 'fitRows'
});
```

For filtering, you would call the `arrange()` method on the Isotope variable.

```css
iso.arrange({
	filter: "*" // All grid items
});

iso.arrange({
	filter: ".tech" // Tech grid items only
});

iso.arrange({
	filter: ".personal" // Personal grid items only
});
```

Pretty simple, right? How do we go about doing the same in our React component defined above?

## Integrating Isotope into React

The changes to the React component are done in the 3 handleClick functions. See below:

```jsx
  handleClickAll(e) {
    this.setState({
      isClickedAll: true,
      isClickedTech: false,
      isClickedPersonal: false
    });
    if (this.iso === undefined)
      this.iso = new Isotope(`.${styles.articlesTiles}`, {
        itemSelector: `.${styles.col}`,
        layoutMode: "fitRows"
      });
    this.iso.arrange({ filter: "*" });
  }

  handleClickTech(e) {
    this.setState({
      isClickedAll: false,
      isClickedTech: true,
      isClickedPersonal: false
    });
    if (this.iso === undefined)
      this.iso = new Isotope(`.${styles.articlesTiles}`, {
        itemSelector: `.${styles.col}`,
        layoutMode: "fitRows"
      });
    this.iso.arrange({ filter: `.${styles.tech}` });
  }

  handleClickPersonal(e) {
    this.setState({
      isClickedAll: false,
      isClickedTech: false,
      isClickedPersonal: true
    });
    if (this.iso === undefined)
      this.iso = new Isotope(`.${styles.articlesTiles}`, {
        itemSelector: `.${styles.col}`,
        layoutMode: "fitRows"
      });
    this.iso.arrange({ filter: `.${styles.personal}` });
  }
```

Each of the functions has called the arrange() method to filter the grid items as required. But why is there an initialization done before every call? Ideally, this code should be in the constructor, right?

```jsx
this.iso = new Isotope(`.${styles.articlesTiles}`, {
        itemSelector: `.${styles.col}`,
        layoutMode: "fitRows"
      });
```
<figcaption>Note: In the code above, my class name for the grid is `${styles.articlesTiles}` and grid item is `${styles.col}`.</figcaption>

Well, I thought so too. And my first implementation had the initialization code in the constructor. But for some reason it didn’t work. I used to get an ‘undefined’ error upon clicking any of the 3 filter buttons. So I moved it into the ComponentDidMount() function thinking it would work from there. But it didn’t either.

Finally, I came up with the idea of initializing before use in each of the 3 `handleClick` functions. You can see that the initialising code is called only when the Isotope is `undefined`, meaning it only runs once.

Now, you can insert the **GridFilter** React component into any of your pages. All you need to do is supply the class names for your grid and grid-item in the initialization code of the component!

Edit (26 Jan 2020): `gatsby build` fails with the error: `window is not defined`. You can read the blog post [Gatsby and the 'window' variable]({{ site.url }}{% post_url 2020-01-24-gatsby-and-the-window-variable %}) to understand this issue and how to fix it!

Note: _Cover Photo by [Sharon McCutcheon](https://unsplash.com/@sharonmccutcheon) on [Unsplash](https://unsplash.com/)!_

Ps: If you do get the Isotope initialization to work in the constructor, let me know!
