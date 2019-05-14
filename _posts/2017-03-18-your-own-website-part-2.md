---
layout:     article
title:      "Your own website - Part II"
author:     amith_raravi
date:       2017-03-10 20:20:00 +0530
modified:   2017-03-18 20:21:00 +0530
categories: [articles, tech]
image:      images/web-hosting.jpg
teaser:     web-hosting-400x250.jpg
---

Bought your own [fancy domain]({{ site.url }}{% post_url 2017-03-09-your-own-website-part-1 %}), did you?! Well that's good :)

In this blog post, I'll take you through the process of setting up Web Hosting for your domain.

## Buy a Web Hosting package

![image]({{ site.imagekiturl }}{{ site.images }}linux-vs-windows-hosting.jpg)

**Decide on a Web Hosting Service:** The one thing you have to decide on is whether you want a `Windows` or `Linux` based web hosting for your website. Linux has more of the features web designers expect, so unless you have websites which need specific Windows applications, Linux is the preferred choice. Windows applications which do require a Windows server: ASP.NET, MSSQL, MS Access, Visual Basic development and Remote Desktop (dedicated servers only).

I would suggest you go for a Linux based one. As it is more secure and Linux gives you a lot of tools preinstalled. It has a lot of high quality open source software too - and new open source server software (stuff like [node.js](https://www.w3schools.com/nodejs/nodejs_intro.asp)) usually becomes available for Linux first.

I guess you know which way I lean by now?! If you aren't convinced yet, then have a look at this [Quora](https://www.quora.com/What-is-the-difference-between-Windows-and-Linux-for-web-hosting) thread for more analysis. You can google your way through what the web has to offer, and take your time to decide. Come back here once you are sure what you want (this depends on your requirements a lot, some features may require `Windows` based web hosting).

Have you decided yet? Awesome, let's move on!

**Where to buy it:** The popular places to buy web hosting packages also offer to sell web domains:  [GoDaddy](https://www.godaddy.com), [BigRock](https://www.bigrock.in), [ZNet](https://www.znetlive.com), [NameCheap](https://www.namecheap.com/) & [HostGator](https://www.hostgator.in). Once you buy your web hosting package, it will usually take about half an hour for it to be visible to the world.

![image]({{ site.imagekiturl }}{{ site.images }}web-hosting.jpg)

If you bought your web hosting from the same place you got your domain, then connecting is quite easy. Usually the website you bought them from will connect it for you.

But if you bought the web hosting package and the domain from different places, there is a bit of setup that you need to do. Log in to the website that you bought the domain from and go to the page where you can manage your domain. You will see options to specify Name Servers. Here you will need to enter the Name Servers that were given by the Web Hosting service. Once you enter them, it will take a few hours for the domain to divert traffic to your website.

Let's not worry if the domain is still not directing to your site. We shall go ahead and build a simple website. Go to the hosting site where your site is hosted and search for the `cpanel` or equivalent page that lists the set of administrative tools for maintaining your website. Don't freak out if you are not able to find it, it's there. Finding it the first time can be a bit intimidating.

Once you know where the `cpanel` is, you can find a File Manager on it. You can use this to edit the `index.html` (this file should be available by default) that is at the root of your website. Just type something as simple as: `Hello World to my own website!!!` and save it. Now if you go to your `www.mydomain.com` from any browser, you can see what you have typed in your `index.html`!

![image]({{ site.imagekiturl }}{{ site.images }}hello-world.png)

Voila, your site just went live to the world!!
