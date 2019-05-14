---
layout:     article
title:      "Adding Comments to a Static Site"
author:     amith_raravi
date:       2018-11-01 17:06:00 +0530
modified:   
categories: [articles, tech]
image:      images/adding-comments-1.jpg
teaser:     adding-comments-1-400x250.jpg
---

Or, How do you add a dynamic part to your static site?

If you need to know how to build a static site, please read my [previous post]({{ site.url }}{% post_url 2017-04-17-building-with-jekyll %}) here. If not, you can head below to implementing comments.

When I created my blog in 2017, I was looking around for an easy and self maintained comments system and found [Staticman](https://staticman.net) fit my requirements to the dot. It was so easy to add it to my Jekyll site and configure correctly with minimal effort. All I needed was a Github account and a repository, which I already had.

About a month back, I discovered that the Staticman component is no longer working as expected. So I head to the GitHub repository of Staticman to see if there is an already existing issue. To my dismay, I not only found there was an [issue](https://github.com/eduardoboucas/staticman/issues/227) raised but that it had to do with the daily limits set by GitHub (which can’t be changed by us mere mortals). So I had to figure out a different way to deliver the comments to my blog.

![image]({{ site.imagekiturl }}{{ site.images }}adding-comments-2.jpg)

I owe you an explanation on why this is a problem. In a static site, the content is just plain HTML/CSS files. Which means the user cannot expect the `Submit` button on the comments page to work. But for an interactive blog, readers should be able to leave feedback. At this point, it’s clear that our static site needs a dynamic part. There are various ways in which developers have tried to do this.

1. Use an already existing commenting system like [Disqus](https://disqus.com), [Just Comments](https://just-comments.com), etc.
	* But this has disadvantages
		* The comments are stored in a 3rd party server.
		* There is no control over your data.
		* It costs money.
2. Save the comments as commits on a GitHub repo.
	1. Point the POST method on the comment FORM to an external URL already setup to handle the request.
		* The external URL can be
			* a [Webhook](https://github.com/adnanh/webhook): Requires [Go](https://golang.org/doc/install) to be installed. And the Webhook needs to be running on the server constantly, this is a difficult thing to accomplish on a managed server. This [Github project](https://github.com/aioobe/dead-simple-jekyll-comments) was one of the things I tried.
			* a Web Service written in any language: Hosting is a problem here, because it ain’t free. I tried Azure, but the ‘Function’ setup is buggy. The link to GitHub kept disappearing. And the free tier on any cloud service usually doesn’t support always-on web services. I tried this [GitHub project](https://github.com/Azure-Functions/jekyll-blog-comments).
		* The script running at the external URL will convert the FORM entry into a file and commit it to the GitHub repository.
	2. Look at the commit and manually add the comment to the site build. And deploy it to the PRODUCTION server.
3. Save each comment as a file on the server.
	1. Point the POST method to a script running on your server.
		* This is only possible on a dynamic server where scripts (PHP, Python, C#.. take your pick) are enabled to run. What I mean is, the web server has
			* The dependencies installed, and
			* The environment setup can run the script in that particular language.
	2. The saved file has to be taken from your server manually and added to your build. And deployed back to the PRODUCTION server.

If option 1’s disadvantages are not really so in your eyes, please go ahead and use it. Else, you will have to think of a way of getting those comments back onto your blog/website. Options 2 and 3 are some of the ways of doing it.

I tried each of the options in the order presented above, and ended up with the last one. This is because, my static server runs on a Linux hosted virtual server with Apache/PHP enabled. I wrote a PHP script, which gets called by the POST method of the comment FORM. The script writes the comment to a file and saves it on the server. I check the server periodically to see if there are new comment files, and add them to my static build and deploy back. My mind says this last part should be automated, but I'm not sure how to do it yet (I see my next blog post!).

---

I was reluctant to add a PHP script initially because I wanted to keep the website purely static. But looking at all these options, I’ve realised that in order to avoid dynamic code, I’m making a choice to do things the hard way.

![image]({{ site.imagekiturl }}{{ site.images }}adding-comments-3.jpg)

Just because I wanted my site to be static doesn’t mean it shouldn’t have any dynamic parts. Commenting is a valued interaction, and as such it requires a script. As soon as I accepted this, things fell into place. A mostly static site with a dynamic script is still quite fast, and now has the added functionality of a dynamic site when required!

Note: If you want to take a look at my website build, checkout my [repo](https://github.com/raravi/amithraravi2.com) on GitHub.

*All images used in this post are from [Unsplash](https://unsplash.com)!*
