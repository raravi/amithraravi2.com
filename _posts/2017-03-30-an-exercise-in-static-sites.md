---
layout:     article
title:      "An Exercise in Static Sites"
author:     amith_raravi
date:       2017-03-30 12:05:00 +0530
modified:   
categories: [articles, tech]
image:      images/static-and-dynamic.png
teaser:     static-and-dynamic-400x250.png
---

As most of you know, this is my first website. Choosing the kind of website I want and the technologies it required was quite time-consuming.

I had to research quite a bit to figure out what my website should look like. I went through a lot of blogs to get a feel for the style and kind of content being presented. And look at the underlying technology used. All of this was a bit overwhelming for me. So, I wanted to walk my readers through the process of website creation. Let me take you through the decision-making steps that landed me in the static-site generation side of the web!

![image]({{ site.imagekiturl }}{{ site.images }}static-and-dynamic.png)

The first thing I did was enrol in web development courses on [udemy](https://www.udemy.com/). Even though I know how HTML/CSS work, I needed a refresher course to take me through the basics. Along with this, I was looking at the technologies built on top of the basic HTML aka the web stack.

> And googled '*how to build a simple blog*' quite a bit :)

A lot of options came up. The chief among them being [Wordpress](https://wordpress.com/). In fact, it seemed to fit all my needs. So I'd decided on it initially. If you are not at all into learning technical side of things, I would recommend sticking with Wordpress. It's a simple setup-and-deploy kind of website management process. You don't have to do anything more.

But I'm interested in setting up everything myself, and own all the data on my site (including comments which we will talk about in a later post) at all times. I moved on to taking up the courses on HTML/CSS/JavaScript & Git/GitHub.

The next thing to look at was: should it be a static site or a dynamic one? In fact, there is a huge debate on that one. Check this Quora [thread](https://www.quora.com/What-is-the-difference-between-Static-Websites-and-Dynamic-Websites) but be warned, it's meant to confuse you :)

A static site is sufficient if you are looking for a website which publishes content not so often, and not many comments are seen in a day. The main advantage is obviously the complete freedom, as you don't need anything else. And the small size, since its just a bunch of HTML/CSS files.

I needed a blog, updated a few times a week or so, which focused on the content with minimal upkeep. And allowed me tinker with the look and feel of the site without too much hassle. For my needs, a static site was good enough. These two links([1](https://bradonomics.com/jekyll-wordpress-speed/) &  [2](http://progur.com/2016/08/jekyll-vs-wordpress.html)) pretty much convinced me to go static!!

As i progressed through the courses I realised I needed a place to get my hands dirty and get complete control over the data in my blog, so that I can play with the look as I wished & code it accordingly. That's when I stumbled upon [Jekyll](https://jekyllrb.com/).

![image]({{ site.imagekiturl }}{{ site.images }}jekyll.png)

To get an idea of how Jekyll sites look, take a look at this [post](https://qrohlf.com/posts/5-best-jekyll-designs) from *qrohlf*'s site. Doesn't it blow your mind?! The look is minimalistic and yet quite stylish. And the focus is on the content. I love the way content gets highlighted in Jekyll based sites. It's about simple presentation!

I will write about setting up the website with Jekyll in an [upcoming post]({{ site.url }}{% post_url 2017-04-17-building-with-jekyll %}). Thank you for being here :)
