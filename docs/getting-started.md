---
layout: page
permalink: /getting-started/
---

## Getting Started

1. [Set up your Jekyll site](https://jekyllrb.com/docs/)
2. Add the following to your site's `Gemfile` file:

    ```
    gem "jekyll-leaflet"
    ```

3. Add the following to your site's `_config.yml` file:

    ```
    gems:
        - jekyll-leaflet
    ``` 

You are now ready to make a map! In any post or page, use the `leaflet_map` Liquid tag block. Use the following code to make a blank map.

{% raw %}
```liquid
{% leaflet_map %}
    {}
{% endleaflet_map %}
```
{% endraw %}

{% leaflet_map %}
    {}
{% endleaflet_map %}

This tag block takes in 1 positional argument, a JSON object. This object can specify a `[lat,long]` center, the `zoom`, a `providerBasemap` (Preview a basemap and pick a "Provider name" from [here](http://leaflet-extras.github.io/leaflet-providers/preview/index.html)), etc.

{% raw %}
```liquid
{% leaflet_map { "center" : [63.0694,  -151.0074],
                 "zoom" : 7,
                 "providerBasemap": "OpenTopoMap" } %}
    {}
{% endleaflet_map %}
```
{% endraw %}

{% leaflet_map {"center" : [63.0694,  -151.0074],
                "zoom" : 7,
                "providerBasemap": "OpenTopoMap"} %}
    {}
{% endleaflet_map %}

You can place any number of "leafet items" inbetween the `leaflet_map` tag blocks. At minimum, there must at least be an empty object `{}` in between the tag blocks, or else the map won't draw at all. Leaflet items include markers, geometries, geojson, features, popups, etc. Each leaflet item tag also takes in a single JSON object positional argument. In this example, we will be drawing 1 marker and 1 Polygon on a map.

{% raw %}
```liquid

{% leaflet_map {"zoom" : 4 } %}

    {% leaflet_marker { "latitude" : 48.7596,
                       "longitude" : -113.787,
                       "popupContent" : "Glacier National Park, Montana"} %}

    {% leaflet_geojson {
        "type": "Feature",
        "properties": { "popupContent": "The whole state of North Dakota",
                        "href": "https://nd.gov" },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [-104.05, 48.99],
                [-97.22,  48.98],
                [-96.58,  45.94],
                [-104.03, 45.94],
                [-104.05, 48.99] ]] } } %}

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
                        "href": "https://nd.gov" },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [-104.05, 48.99],
                [-97.22,  48.98],
                [-96.58,  45.94],
                [-104.03, 45.94],
                [-104.05, 48.99] ]] } } %}

{% endleaflet_map %}

All above examples have shown you passing in a JSON object as the first positional argument of a `{% leaflet_geojson %}` tag. When you specify a String as the first positional argument, the argument will be read as a URL, and the data will be fetched from that URL.

{% raw %}
```liquid

{% leaflet_map {"zoom" : 13 } %}
    {% leaflet_marker {"latitude" : 34.296184,
                       "longitude" : -117.211329,
                       "popupContent": "Arrowhead Pinacles Trail"} %} 
    {% leaflet_geojson "/tech/jekyll-leaflet/assets/hike.geojson" %}

{% endleaflet_map %}

```
{% endraw %}

{% leaflet_map {"zoom" : 13 } %}
    {% leaflet_marker {"latitude" : 34.296184,
                       "longitude" : -117.211329,
                       "popupContent": "Arrowhead Pinacles Trail"} %} 
    {% leaflet_geojson "/tech/jekyll-leaflet/assets/hike.geojson" %}

{% endleaflet_map %}


The true power of `jekyll-leaflet` is unlocked when you connect the previous concepts with programatic control flow with Liquid. Let's say you have some [sample posts]({{site.baseurl}}samples/sample-post-1/) that are tagged with location information in the front matter like this:

```yaml
layout: post
title: Sample Post 1
location:
    geojson: '{
        "type": "Feature",
        "properties": {"popupContent": "Banff National Park"},
        "geometry": {
            "type": "Point",
            "coordinates": [-115.928160, 51.495437]
        }
    }'
permalink: /samples/sample-post-1/
```

You could cycle through all posts in your site via {% raw %}`{% for post in site.posts %}`{% endraw %} inside of the `leaflet_map` block, assigning each `post.location.geojson` to a {%raw%}`{% leaflet_geojson %}`{%endraw%} leaflet item. __This would give you a dynamic, always up-to-date map of your posts and their locations__. We have some sample posts set up, so running the following code will generate such a map:

{% raw %}
```liquid
{% leaflet_map {"zoom" : 4,
                "center" : [50, -114],
                "providerBasemap": "OpenStreetMap.HOT"} %}
    {%- for post in site.posts -%}
        {% if post.location.geojson %}
            {% leaflet_geojson {{post.location.geojson}} %}
        {% elsif post.location.latitude and post.location.longitude %}
            {% leaflet_marker { "latitude" : {{post.location.latitude}},
                                "longitude" : {{post.location.longitude}} } %}
        {% endif %}
    {% endfor %}
{% endleaflet_map %}
```
{% endraw %}

{% leaflet_map {"zoom" : 4,
                "center" : [50, -114],
                "providerBasemap": "OpenStreetMap.HOT"} %}
    {%- for post in site.posts -%}
        {% if post.location.geojson %}
            {% leaflet_geojson {{post.location.geojson}} %}
        {% elsif post.location.latitude and post.location.longitude %}
            {% leaflet_marker { "latitude" : {{post.location.latitude}},
                                "longitude" : {{post.location.longitude}} } %}
        {% endif %}
    {% endfor %}
{% endleaflet_map %}

This documentation that you are reading is [generated in Jekyll](https://github.com/DavidJVitale/jekyll-leaflet/tree/master/docs) using the `jekyll-leaflet` plugin. You can clone the repository, build the site locally, and modify everything you are reading.

I use this plugin for my personal travel blog, located at [https://davidjvitale.com/blog/travel/](https://davidjvitale.com/blog/travel/). You can see how I use Liquid to put all my travel posts onto one map, while overriding the URL to link to each individual post.
