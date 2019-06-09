require "json"
module Jekyll
    module OverrideHRefsFilter
        def override_hrefs(input, href)
            geojson_obj =  JSON.parse(input)
            geojson_obj = _recurs_href_replace(geojson_obj, href)
            return JSON.generate(geojson_obj)
        end

        def _recurs_href_replace(obj, href)
            if obj.is_a? Hash
                obj.each_pair do |key, value|
                    if key == "href"
                        obj[key] = href
                    elsif key == "properties"
                        obj[key]["href"] = href
                    else
                        obj[key] = _recurs_href_replace(value, href) 
                    end
                end
            end
            if obj.is_a? Array
                new_arr = []
                for entry in obj
                    new_arr.push(_recurs_href_replace(entry, href))
                end
                obj = new_arr
            end

            obj
        end
    end
end

Liquid::Template.register_filter(Jekyll::OverrideHRefsFilter)
