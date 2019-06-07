---
layout: page
permalink: /getting-started/
---

## Getting Started

1. [Set up your Jekyll site](https://jekyllrb.com/docs/)
2. Add the following to your site's `Gemfile` file:

    ```
    gem 'jekyll-leaflet'
    ```

3. Add the following to your site's `_config.yml` file:

    ```
    gems:
        - jekyll-leaflet
    ``` 

You are now ready to make a map! In any post or page, use the `leaflet_map` Liquid tag block:

{% raw %}
```
{% leaflet_map %}
    {}
{% endleaflet_map %}
```
{% endraw %}


This will make a blank map like this:

{% leaflet_map %}
    {}
{% endleaflet_map %}

This tag can take in 1 positional argument, a JSON object. This object can specify a `[lat,long]` center, the `zoom`, a `providerBasemap`, and more.

{% raw %}
```
{% leaflet_map {"center" : [63.0694,  -151.0074],
                "zoom" : 7,
                "providerBasemap": "OpenTopoMap"} %}
    {}
{% endleaflet_map %}
```
{% endraw %}

{% leaflet_map {"center" : [63.0694,  -151.0074],
                "zoom" : 7,
                "providerBasemap": "OpenTopoMap"} %}
    {}
{% endleaflet_map %}

You can place any number of "Leafet Items" inbetween the `leaflet_map` tag blocks. Leaflet Items include markers, geometries, geojson, features, popups, etc. Each Leaflet Item tag also takes in a single JSON object positional argument. In this example, we will be drawing 1 marker and 1 Polygon on a map.

{% raw %}
```
{% leaflet_map {"zoom" : 4 } %}

    {% leaflet_marker { "latitude" : 48.7596,
                       "longitude" : -113.787,
                       "popupContent" : "Glacier National Park, Montana"} %}

    {% leaflet_geojson {
        "type": "Feature",
        "properties": { "popupContent": "The whole state of North Dakota" },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [-104.05, 48.99],
                [-97.22,  48.98],
                [-96.58,  45.94],
                [-104.03, 45.94],
                [-104.05, 48.99] ]] } }%}

{% endleaflet_map %}
```
{% endraw %}

{% leaflet_map {"zoom" : 4 } %}

    {% leaflet_marker { "latitude" : 48.7596,
                       "longitude" : -113.787,
                       "popupContent" : "Glacier National Park, Montana"} %}

    {% leaflet_geojson {
        "type": "Feature",
        "properties": { "popupContent": "The whole state of North Dakota",
                        "href": "https://northdakota.gov" },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [-104.05, 48.99],
                [-97.22,  48.98],
                [-96.58,  45.94],
                [-104.03, 45.94],
                [-104.05, 48.99] ]] } } %}

{% endleaflet_map %}


{% raw %}
```
{% leaflet_map {"zoom": 4} %}
    {%- for post in site.posts -%}
        {% if post.location.geojson %}
            {% leaflet_geojson post.location.geojson %}
        {% endif %}
    {% endfor %}
{% endleaflet_map %}
        
```
{% endraw %}

{% for post in site.posts %}
    {{post.location.geojson}}
{% endfor %}

{% leaflet_map {"zoom": 4} %}
    {%- for post in site.posts -%}
        {% assign geojson = post.location.geojson %}
        {% if geojson %}
            {% leaflet_geojson geojson %}
        {% endif %}
    {% endfor %}
{% endleaflet_map %}



Now that you know how to create a map and add items to it, head over to the [Samples](/samples/) section to see some awesome use cases (tagging posts with a location, aggregating certain posts and displaying them on a map, etc.). You can also check out the [API Reference](/api-ref/) and the [Github repository](https://github.com/DavidJVitale/jekyll-leaflet).
