function getUrlParameters(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}
function _loadJs(url, success) {
  // TODO : check if the file is already loaded
  var script = document.createElement('script');
  script.src = url;
  var head = document.getElementsByTagName('head')[0],
  done = false;
  head.appendChild(script);
  // Attach handlers for all browsers
  script.onload = script.onreadystatechange = function() {
    if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
      done = true;
      try {
        success();
      } catch(err) {

      }
      script.onload = script.onreadystatechange = null;
      head.removeChild(script);
    }
  };
}

if (typeof jQuery == 'undefined') {
  _loadJs('https://code.jquery.com/jquery-3.1.1.min.js', function() {
    jQuery.noConflict();
    _initView();
  });
}
else {
  jQuery.noConflict();
  _initView();
}

function _initView(){
  var vidParam = getUrlParameters('v');
  var listParam = getUrlParameters('list');

  var hidePlistBtn = `
    <button id="playlist-hide" class="yt-uix-button playlist-hide" type="button" title="Nascondi la playlist"></button>
  `;
  var showPlistBtn = `
    <button id="playlist-show" class="yt-uix-button playlist-show" type="button" title="Mostra la playlist"></button>
  `;
  if(vidParam && listParam){
    // video playing and playlist open
    jQuery(document).remove('#playlist-hide');
    jQuery(document).remove('#playlist-show');
    jQuery('.appbar-playlist-controls').append(hidePlistBtn);
    jQuery(body).append(showPlistBtn);

    jQuery('#playlist-hide').click(function(){
      jQuery('#player-playlist').animate({
        right: '430px'
      }, 300, function(){
        jQuery('#placeholder-playlist').css('display','none');
        jQuery('#watch7-sidebar-contents').css('overflowY', 'auto');
        jQuery('#watch7-sidebar-contents').animate({
          minHeight: '1px',
          height: '880px'
        }, 200);
        jQuery('#playlist-show').css('display','block');
      });
    });

    jQuery('#playlist-show').click(function(){
      jQuery('#watch7-sidebar-contents').animate({
        minHeight: '880px',
        height: 'auto'
      }, 300, function(){
        jQuery('#placeholder-playlist').css('display','block');
        jQuery('#player-playlist').animate({
          right: '0'
        }, 200);
        jQuery('#playlist-show').css('display','none');
      });
    });

  }
  else if (vidParam && !listParam) {
    // video playing and not in playlist
    jQuery('#watch7-sidebar-contents').css('overflowY', 'auto');
    jQuery('#watch7-sidebar-contents').animate({
      minHeight: '1px',
      height: '880px'
    }, 200);
  }
  else {
    // no video playing
  }
}
