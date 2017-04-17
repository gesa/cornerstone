##
# Creates a Liquid embed_video tag. The usage should follow:
#
# {% embed_video video_id=VIDEO video_provider=PROVIDER %}
#
# where PROVIDER is `youtube`, `vimeo`, or `facebook`
#
# This will embed a responsive video.
# ------------------------------------------------------------------------------

module Jekyll
  class EmbedVideoTag < Liquid::Tag

    def initialize(tag_name, text, options)
      super
      @attributes = Hash.new
      args       = text.split(/\s+/).map(&:strip)
      args.each do |arg|
        key,value = arg.split('=').map(&:strip)
        if key && value
          if value =~ /^'(.*)'$/
            value = $1
          end
          @attributes[key] = value
        end
      end
    end

    def render()
      video_url = case @attributes['video_provider'].downcase
                    when 'youtube'
                      "https://www.youtube-nocookie.com/embed/#{@attributes['video_id']}?rel=0"
                    when 'vimeo'
                      "https://vimeo.com/" + @attributes['video_id']
                    when 'facebook'
                      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffightfortheftr%2Fvideos%2F" + @attributes['video_id'] + "%2F%3Ftype%3D3&show_text=0&width=1280"
                    else
                      "#"
                  end
      (<<-MARKUP)
<figure class="video">
  <iframe width="1280" height="720" src="#{video_url}" frameborder="0" allowfullscreen></iframe>
</figure>
      MARKUP

    end
  end
end

Liquid::Template.register_tag('embed_video', Jekyll::EmbedVideoTag)
