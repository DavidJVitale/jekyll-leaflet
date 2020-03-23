---
layout: home
---

## Create [leaflet.js](https://leafletjs.com/) maps in [Jekyll](https://jekyllrb.com/). As easy as:

{% raw %}
```liquid
{% leaflet_map { "zoom" : 9 } %}
    {% leaflet_marker { "latitude" : 41.881832,
                        "longitude" : -87.623177,
                        "popupContent" : "Hello World from Chicago!" } %}
{% endleaflet_map %}
```
{% endraw %}
{% leaflet_map {"zoom": 9 } %}
    {% leaflet_marker { "latitude" : 41.881832,
                        "longitude" : -87.623177,
                        "popupContent" : "Hello World from Chicago!" } %}
{% endleaflet_map %}

<h2><a href="{{site.baseurl}}getting-started/">Getting Started</a></h2>

