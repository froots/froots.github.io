(function() {
  var formContainer;
  var observer;
  var config = {
    attributes: true,
    attributeFilter: ['class']
  }

  function init() {
    formContainer = document.querySelector('[data-optin]');
    if (formContainer) {
      observer = new MutationObserver(handleMutation);
      observer.observe(formContainer, config);
    }
  }

  function handleMutation(mutations, obs) {
    var showClass = formContainer.dataset.optinShowClass;
    var label = formContainer.dataset.optin;
    if(formContainer.classList.contains(showClass)) {
      dataLayer.push({
        'event': 'gaEvent',
        'eventCategory': 'optin',
        'eventAction': 'show-form',
        'eventLabel': label,
        'eventValue': undefined
      });
      observer.disconnect();
    }
  }

  if (MutationObserver &&
    document.documentElement.classList &&
    document.documentElement.dataset) {
    init();
  }
})(window.dataLayer);
