;(function(window) {
  var eventLinks

  function init() {
    if (!document.querySelectorAll || !document.documentElement.dataset || !window.dataLayer) {
      return;
    }

    eventLinks = document.querySelectorAll('a[data-event-category]');

    [].forEach.call(eventLinks, function(eventLink) {
      eventLink.addEventListener('click', handleClick);
    });
  }

  function handleClick(ev) {
    var eventCategory = this.dataset.eventCategory;
    var eventAction = this.dataset.eventAction;
    var eventLabel = this.dataset.eventLabel;
    var eventValue = this.dataset.eventValue;
    console.log(eventCategory, eventAction, eventLabel, eventValue);

    window.dataLayer.push({
      'event': 'gaEvent',
      'eventCategory': eventCategory,
      'eventAction': eventAction,
      'eventLabel': eventLabel,
      'eventValue': eventValue
    });
  }

  init();
})(window);
