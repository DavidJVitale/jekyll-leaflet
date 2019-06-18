---
layout: post
title: Sample Post 3
location:
    latitude: 49.814399
    longitude: -125.598810
permalink: /samples/sample-post-3/
---

A sample post with this front matter:

{% raw %}
```
---
layout: post
title: Sample Post 3
location:
    geojson: '{
        "type": "Feature",
        "properties": {"popupContent": "Strathcona Provincial Park",
                       "href" : "/samples/sample-post-3/},
        "geometry": {
            "type": "Point",
            "coordinates":
		[-125.598810, 49.814399]
        }
    }'
permalink: /samples/sample-post-3/
---
```
{% endraw %}
