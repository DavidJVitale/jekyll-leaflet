(() => {
// Specify configuration variables, setup any elements and styling
    var leafletCdn = "https://unpkg.com/leaflet@1.6.0/dist/";
    var esriLeafletCdn = "https://unpkg.com/esri-leaflet/dist/";

    // Get tag input arguments & inside block object list
    var tagInputArg = %{tag_input_arg_json};
    var blockLeafletItems = [%{inside_block_leaflet_items}];

    // Override the map div id if specified, apply default CSS
    var defaultMapElId = "leaflet-map-%{id}";
   var defaultMapElStyle = "height:300px; margin-top:15px; margin-bottom:15px";
    var mapEl = document.getElementById(defaultMapElId);
    if('divId' in tagInputArg){
        mapEl.id = tagInputArg['divId'];
    }
    var defaultMapCssEl = document.createElement("style");
    defaultMapCssEl.innerHTML = 
        "#" + defaultMapElId + "{" + defaultMapElStyle + "}";
    document.head.appendChild(defaultMapCssEl);

    var newWindowImgSrcBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4wUVFzAHq2j99AAAAV9JREFUSMdjYKAxYCRHk5ubG9+1a9fm/v//H6cadnb2G/fu3atlIceC379/c3z9+jUEn5q/f/8eYWBgYECxQE5OroqA2Y8ePXq0hJWV9Qc3N/caZB8wMjJKff361QpvEAkKCv4nYMGh9+/f26MLamhoyLx9+3b/nz9/VJCC6MiLFy9sWXCE3xlGRsZvWKQu4DOciYnpCzc396HPnz97weRxWRD/8OHDa4TiAt1wfn5+z79//zoxMDDALWAiN/lhM/zevXtH0NUx0dJwsiwgxXCccUCJ4dzc3DP+//+/gZ2d/duLFy9Is+Djx4+rCbn82rVrrxgYGF6RFUR8fHyZbGxsD7AZLiEhUSAiIrJSUlIyjOw4uHnz5gVHR0d1bC7/8+eP5d+/f8P+/PmjS1Ekr1ix4hcp6ploXVwPfQuwJlMmJiYBLS0tIVIMev36NRvRFnz48OHohw8fhkYQjQKCAAChiL6Pj/LM2QAAAABJRU5ErkJggg==";

// Actual mapping section; Specify a function to be called later that 
// assembles the correct JS components based on what the user specified in the 
// tag input arg, the block section of features, etc. Actually creates the map
// that is visible on the page

    function _getCenter(){
        var defaultCenter = [0,0];
        if("center" in tagInputArg){
            return tagInputArg.center;
        } else {
            return defaultCenter;
        }
    }

    function _getZoom(){
        var defaultZoom = 1;
        if("zoom" in tagInputArg){
            return tagInputArg.zoom
        } else {
            return defaultZoom;
        }
    }

    function _getProviderBasemap(){
        var defaultProviderBasemap = "OpenStreetMap.Mapnik";
        if("providerBasemap" in tagInputArg){
            return tagInputArg.providerBasemap;
        } else {
            return defaultProviderBasemap;
        }
    }


    function _addMarkerToMap(leafletItem, map){
        var m = leafletItem.value;
        var result = L.marker([m.latitude, m.longitude]).addTo(map);
        var potentialPopup = "";
        if('popupContent' in m){
                potentialPopup += m.popupContent;}
        if('href' in m){
            potentialPopup += '<a href="' + m.href + '">' + 
                '<img src="' + newWindowImgSrcBase64 + '"></img></a>';}
        if(potentialPopup){
            result.bindPopup(potentialPopup);}
        if(!('center' in tagInputArg)){
            // If the user didn't specify a center, infer from marker
            map.panTo(new L.LatLng(m.latitude, m.longitude));
        }
    }

    function _onEachFeature(feature, layer){
        var potentialPopup = ""
        if(feature.properties && feature.properties.popupContent){
            potentialPopup += feature.properties.popupContent;
        }
        if(feature.properties && feature.properties.href){
            potentialPopup += 
                '<a href="' + feature.properties.href + '">' + 
                    '<img src="' + newWindowImgSrcBase64 + '"></img></a>';}
        if(potentialPopup){
            layer.bindPopup(potentialPopup);
        }
    }

    function _addGeoJSONToMap(leafletItem, map){
        if(typeof leafletItem.value === "string"){
            fetch(leafletItem.value).then((resp) => {
                return resp.json();
            }).then((data) => {
                leafletItem.value = data;
                _addGeoJSONObjToMap(leafletItem, map);
            }).catch((err) => {
                console.log("Encountered err w/ geojson, attempting to fix..");
                console.log(err);
                _addGeoJSONObjToMap(leafletItem, map);
            });
        } else {
            _addGeoJSONObjToMap(leafletItem, map);
        }
     }

    function _addGeoJSONObjToMap(leafletItem, map){
         var geojson = L.geoJSON(leafletItem.value, { 
            onEachFeature: _onEachFeature 
        });
        layers = geojson.getLayers();
        for(var i=0; i<layers.length; i++){
            try{
                var geom = layers[i].feature.geometry;
                if(!('center' in tagInputArg)){
                    // If the user didn't specify a center, infer from geojson
                    //console.log("panning to " + geom.coordinates);
                    map.panTo(new L.LatLng(geom.coordinates[1],
                                           geom.coordinates[0]));
                }
            } catch(e){}
        }
       
        geojson.addTo(map);
       
    }

    function _processLeafletItem(leafletItem, map){
        switch(leafletItem.type){
            case "LeafletMarker":
                _addMarkerToMap(leafletItem, map);
                break;
            case "LeafletGeoJSON":
                _addGeoJSONToMap(leafletItem, map);
                break;
            case undefined:
                break; 
            default:
                console.log("Couldn't add item " + leafletItem.id);
                break;
        }
    }

//The actual section that is called that creates a map
    function createMap(){
        console.log("Creating map %{id} with these args:");
        console.log(tagInputArg);

        //Initialize Map with the correct input arguments
        var map = L.map(mapEl.id, 
            {worldCopyJump: true}).setView(_getCenter(), _getZoom());
        L.tileLayer.provider(_getProviderBasemap()).addTo(map);
        if("esriBasemap" in tagInputArg){
            L.esri.basemapLayer(tagInputArg.esriBasemap).addTo(map);
        }

        //process each Leaflet Item passed in between the block tag middle
        for(var i=0; i<blockLeafletItems.length; i++){
            var leafletItem = blockLeafletItems[i];
            console.log("Adding leaflet item " + leafletItem.id + ":");
            console.log(leafletItem);
            _processLeafletItem(leafletItem, map);
        }
    }

// Load the correct JS libraries/CSS by adding to head: 
// When ready, call createMap() to create the map on the page

    function _createMap(){
        // helper function to draw the map only when everything is loaded,
        // safeguards against multiple calls to window.onload
        var prevOnLoad;
        if(window.onload){
            prevOnLoad = window.onload;
        }
        window.onload = () => {
            createMap();
            if(prevOnLoad){
                prevOnLoad();
            }
        }
    }

    var leafletCssId = "leaflet-css-head";
    var leafletJsId = "leaflet-js-head";
    var esriLeafletJsId = "esri-leaflet-js-head";
    var leafletProvidersJsId = "leaflet-providers-js-head";

    // Add the leaflet CSS first, don't worry about when it loads
    var leafletCssEl = document.createElement("link");
    leafletCssEl.id = leafletCssId;
    leafletCssEl.rel = "stylesheet";
    leafletCssEl.href = leafletCdn + "leaflet.css";
    if(!document.getElementById(leafletCssEl.id)){
        document.head.appendChild(leafletCssEl);
    }

    function addToHeadIfNotLoaded(el) {
        //Add the el to the head if it doesn't exist already. If it does,
        //everything we need is already loaded, so draw the map
        if(!document.getElementById(el.id)){
            document.head.appendChild(el);
        } else {
            _createMap();
        }
    }

    // Load the main leaflet.js code, wait for it to load
    var leafletJsEl = document.createElement("script");
    leafletJsEl.id = leafletJsId;
    leafletJsEl.onload = () => {
        //After loaded, load the esri-leaflet.js code, wait for it to load
        var esriEl = document.createElement("script");
        esriEl.id = esriLeafletJsId;
        esriEl.onload = () => {
            //After loaded, add the inline leaflet-providers <script>
            provEl = document.createElement("script");
            provEl.id = leafletProvidersJsId;
            provEl.innerHTML = `%{leaflet_providers_js_content}`;
            if(!document.getElementById(provEl.id)){
                 document.head.appendChild(provEl);        
            }
            _createMap();
            }
        esriEl.src = esriLeafletCdn + "esri-leaflet.js";
        addToHeadIfNotLoaded(esriEl);
        };
    leafletJsEl.src = leafletCdn + "leaflet.js";
    addToHeadIfNotLoaded(leafletJsEl);
})();
