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
					<img src="{{ site.imagekiturl }}{{ site.images }}{{ site.teaser }}" data-src="{{ site.imagekiturl }}{{ site.images }}{{ post.teaser }}" alt="teaser">
					{%- else %}
					<img src="{{ site.imagekiturl }}{{ site.images }}{{ site.teaser }}" alt="teaser">
					{%- endif %}
				</p>
				<h2 class="post-title">{{ post.title }}</h2>
			</a>
		</article>
		{%- endif -%}
	{%- endfor %}
</div>
