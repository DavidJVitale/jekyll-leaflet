# jekyll-leaflet

https://davidjvitale.com/tech/jekyll-leaflet/

Embed leatlet.js maps in Jekyll. As simple as:

```
{% leaflet_map %}
    {% leaflet_marker { "latitude" : 41.881832,
                       "longitude" : -87.623177,
                       "popupContent" : "Hello World from Chicago!"} %}
{% endleaflet_map %}
```

![](./docs/assets/screenshot.png)
