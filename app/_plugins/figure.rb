##
# Creates a Liquid figure tag. The usage should follow:
#
# {% figure path/to/photo.jpg A caption describing the photo or graphic %}
#
# This returns the following html:
#
# <figure>
#  <img src="path/to/photo.jgp" alt="A caption describing the photo or graphic" />
#   <figcaption>
#     A caption describing the photo or graphic
#   </figcaption>
# </figure>
#
# ------------------------------------------------------------------------------

module Jekyll
  class FigureTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @attributes = text.split(' ')
    end

    def render()

      imgsrc   = @attributes[0]
      @attributes.shift
      caption = @attributes.join(" ")

      (<<-MARKUP)
<figure>
  <img src="#{imgsrc}" alt="#{caption}" />
  <figcaption>
   #{caption}
  </figcaption>
</figure>
      MARKUP

    end
  end
end

Liquid::Template.register_tag('figure', Jekyll::FigureTag)
