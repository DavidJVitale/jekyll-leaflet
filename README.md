## jekyll-leaflet

Embed leatlet.js maps in Jekyll. As simple as:

```
{% leaflet_map %}
    {% leaflet_marker { "latitude" : 41.881832,
                      { "longitude" : -87.623177,
                      { "popupContent" : "Hello World from Chicago!"} %}
{% end_leaflet_map %}
```
