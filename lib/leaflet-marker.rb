require 'securerandom'
module Jekyll
  class RenderTimeTagBlock < Liquid::Tag

    def initialize(tag_name, input, tokens)
      super
      @input = input
    end

    def render(context)
        text = super
        "Hello Marker!"
    end

  end
end

Liquid::Template.register_tag('leaflet_marker', Jekyll::RenderTimeTagBlock)
