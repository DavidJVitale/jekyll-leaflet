require 'securerandom'
require 'json'
module Jekyll
class LeafletMap < Liquid::Block

    def initialize(tag_name, input, tokens)
        super
        if input.empty?
            @input = {}
        else
            @input = input
        end
        
        if !(input.is_a? String)
            raise "leaflet-map input argument must be a String"
        end

    end


    def render(context)
        text = super        
        if !(text.is_a? String)
            raise "leaflet-map content between the tag blocks must a String"
        end
        leaflet_providers_js_content = File.read(
            File.expand_path("./leaflet-providers.js", File.dirname(__FILE__)))

        map_js = File.read(
            File.expand_path("./leaflet-map.js", File.dirname(__FILE__)))
        map_html = File.read(
            File.expand_path("./leaflet-map.html", File.dirname(__FILE__)))

        @input = parse_liquid_output_in(@input, context)
        id = SecureRandom.hex
        map_js = map_js % {id: id,
                           leaflet_providers_js_content: leaflet_providers_js_content,
                           tag_input_arg_json: @input,
                           inside_block_leaflet_items: text}
        map_html = map_html % {id: id,
                               leaflet_map_js_content: map_js}

        map_html
    end

    end
end

Liquid::Template.register_tag('leaflet_map', Jekyll::LeafletMap)
