require 'securerandom'
module Jekyll
  class RenderTimeTagBlock < Liquid::Block

    def initialize(tag_name, input, tokens)
      super
      @input = input
    end

    def render(context)
        text = super        
        leaflet_providers_js_content = File.read("./_plugins/leaflet-providers.js")

        map_preparsed_html = File.read("./_plugins/leaflet-map.html")
        map_parsed_html = map_preparsed_html % {id: SecureRandom.hex,
                                                leaflet_providers_js_content: leaflet_providers_js_content,
                                                tag_input_arg_json: @input,
                                                inside_block_leaflet_objects: text}

        map_parsed_html
    end

  end
end

Liquid::Template.register_tag('leaflet_map', Jekyll::RenderTimeTagBlock)
