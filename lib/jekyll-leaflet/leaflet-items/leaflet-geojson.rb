require "securerandom"

module Jekyll
    class LeafletGeoJSON < Liquid::Tag

        def initialize(tag_name, input, tokens)
            super
            if input.empty?
                @input = '{}'
            else
                @input = input
            end
        end

        def render(context)
            value = "#{context[@input.strip]}"
            if value.empty?
                value = @input
            end
            '{id: "' + SecureRandom.hex + '",
              type: "LeafletGeoJSON",
              value: ' + value + '},'

        end
    end
end

Liquid::Template.register_tag('leaflet_geojson', Jekyll::LeafletGeoJSON)
