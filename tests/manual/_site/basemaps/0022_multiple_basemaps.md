{% leaflet_map {"providerBasemap":"OpenTopoMap",
                "esriBasemap": "Oceans"}%}
    {% leaflet_marker { "latitude" : 41.881832,
                       "longitude" : -87.623177,
                       "popupContent" : "Hello World from Chicago!"} %}
{% endleaflet_map %}

The above map should look like this:
