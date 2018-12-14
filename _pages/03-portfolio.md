---
layout: archive
title: Portfolio
permalink: /portfolio/
---

<div class="articles-tiles">
{%- for post in site.posts -%}
	{%- if post.layout == "media" %}
			<div class="col">
			{% include post-grid.html -%}
			</div>
	{%- endif -%}
{%- endfor %}
</div><!-- /.tiles -->
