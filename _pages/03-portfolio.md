---
layout: archive
title: Portfolio
permalink: /portfolio/
---

<div class="article-header">
	<div class="page-title">
		<h2>{{ page.title }}</h2>
	</div>
</div>
<div class="div-5-high"></div>
<div class="portfolio-tiles-grid">
	{%- for post in site.posts -%}
		{%- if post.layout == "media" %}
		<article class="portfolio-tile col">
			<a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}" class="portfolio-link">
				<p class="post-teaser">
					{%- if post.teaser %}
					<img src="{{ site.url }}{{ site.images }}{{ post.teaser }}" alt="teaser">
					{%- else %}
					<img src="{{ site.url }}{{ site.images }}{{ site.teaser }}" alt="teaser">
					{%- endif %}
				</p>
				{%- if post.date %}
					<p class="entry-date date published">
						<time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date: "%B %d, %Y" }}</time>
					</p>
				{%- endif %}
			<h2 class="post-title">{{ post.title }}</h2>
			<p class="post-excerpt">{{ post.excerpt | strip_html | strip | truncate: 160 }}</p></a>
		</article><!-- /.tile -->
		{%- endif -%}
	{%- endfor %}
</div><!-- /.tiles -->
