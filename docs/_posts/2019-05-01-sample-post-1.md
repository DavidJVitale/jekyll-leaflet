---
layout: post
title: Sample Post 1
location:
    geojson: '{
        "type": "Feature",
        "properties": {"popupContent": "Banff National Park",
                       "href":"/tech/jekyll-leaflet/samples/sample-post-1/"},
        "geometry": {
            "type": "Point",
            "coordinates":
		[-115.928160, 51.495437]
        }
    }'
permalink: /samples/sample-post-1/
---

A sample post with this front matter:

{% raw %}
```
---
layout: post
title: Sample Post 1
location:
    geojson: '{
        "type": "Feature",
        "properties": {"popupContent": "Banff National Park",
                       "href":"/samples/sample-post-1/"},
        "geometry": {
            "type": "Point",
            "coordinates":
		[-115.928160, 51.495437]
        }
    }'
permalink: /samples/sample-post-1/
---
```
{% endraw %}
