$( document ).ready(function() {

const RSS_URL = "http://rss.castbox.fm/everest/873fc30172c34f97a64c2805efd531f2.xml";

var first;

$.ajax(RSS_URL, {
  accepts: {
    xml: "application/rss+xml"
  },

  dataType: "xml",

  success: function(data) {
    $(data)
      .find("item")
.each(function() {
           const el = $(this);
           if (!first){
              first = el;
           }
        const template = `
          <article class="media">
            <div class="media-right">
              <figure class="image is-45x45">
                                   <a href="${el
                            .find("link")
                                        .text()}">
                                     <img alt="Image" class="avatar" src="./images/play.png">
                                     </a>
              </figure>
            </div>
            <div class="media-content has-text-right">
              <div class="content">
                <a href="${el
                         .find("link")
                                     .text()}" rel="noopener">
                  <h5 class="topic-name">
                    ${el.find("title").text()}
                  </h5>
                </a>
              </div>
              <nav class="level is-mobile">
                <div class="level-right">
                  <span class="level-item">
                    <span class="icon">
                      <i class="fas fa-clock"></i>
                    </span>
                    ${el.find("pubDate").text()}
                  </span>
                  <span class="level-item">
                    <span class="icon">
                      <i class="fas fa-book"></i>
                    </span>
                    ${el.find("description").text()}
                  </span>
                </div>
              </nav>
            </div>
          </article>
        `;
          $("#container").append(template);
          });

          const last_episode_mp3 = first.find("enclosure").attr('url');
          $("audio").attr("src", last_episode_mp3);
	  $('audio').audioPlayer();
  }
});

});
