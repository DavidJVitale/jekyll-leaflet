require 'securerandom'
module Jekyll
  class RenderTimeTagBlock < Liquid::Block

    def initialize(tag_name, input, tokens)
      super
      @input = input
    end

    def render(context)
        text = super        
        leaflet_providers_js_content = File.read(
            File.expand_path("./leaflet-providers.js", File.dirname(__FILE__)))

        map_preparsed_html = File.read(
            File.expand_path("./leaflet-map.html", File.dirname(__FILE__)))
        map_parsed_html = map_preparsed_html % {id: SecureRandom.hex,
                                                leaflet_providers_js_content: leaflet_providers_js_content,
                                                tag_input_arg_json: @input,
                                                inside_block_leaflet_objects: text}

        map_parsed_html
    end

  end
end

Liquid::Template.register_tag('leaflet_map', Jekyll::RenderTimeTagBlock)
