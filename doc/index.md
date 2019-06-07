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

{% leaflet_map { "zoom": 9 } %}
    {% leaflet_marker { "latitude" : 41.881832,
                        "longitude" : -87.623177,
                        "popupContent" : "Hello World from Chicago!"} %}
{% endleaflet_map %}

<div id = "container" style = "width:100%">
    <div id ="left" style = "float:left; width: 25%;">
        <h3 style="text-align:center"> <a href="/getting-started/">Getting Started</a></h3>
    </div>
    <div id = "middle" style = "float:left; width: 50%;">
        <h3 style="text-align:center"> <a href="/samples/">Samples</a></h3>
    </div>
    <div id = "right" style = "float:left; width: 25%;">
        <h3 style="text-align:center"> <a href="/api-ref/">API Ref</a></h3>
    </div>
</div>
