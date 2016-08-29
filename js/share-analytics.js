;(function(window) {
  var shareLinks;

  function init() {
    if (!document.querySelectorAll || !document.documentElement.dataset || !window.dataLayer) {
      return;
    }

    shareLinks = document.querySelectorAll('[data-social-share]');

    [].forEach.call(shareLinks, function(shareLink) {
      shareLink.addEventListener('click', handleShareClick);
    });
  }

  function handleShareClick(ev) {
    var network = this.dataset.socialShare;
    window.dataLayer.push({
      'event': 'gaSocial',
      'socialNetwork': network,
      'socialAction': 'share',
      'socialTarget': window.location.href
    });
  }

  init();
})(window);
