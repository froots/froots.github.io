(function() {
  var formContainer;
  var formEl;
  var observer;
  var mutationObserverConfig = {
    attributes: true,
    attributeFilter: ['class']
  }

  function init() {
    formContainer = document.querySelector('[data-optin]');
    formEl = document.getElementById('ck_subscribe_form');

    if (formEl) {
      formEl.addEventListener('submit', handleSubmit);
    }

    if (formContainer &&
      formContainer.dataset &&
      formContainer.dataset.optinShowClass &&
      formContainer.classList &&
      MutationObserver) {
      initFormShowEvent();
    }
  }

  function initFormShowEvent() {
    if (formContainer) {
      observer = new MutationObserver(handleMutation);
      observer.observe(formContainer, mutationObserverConfig);
    }
  }

  function handleSubmit() {
    pushEvent('submit-form');
  }

  function handleMutation(mutations, obs) {
    var showClass = formContainer.dataset.optinShowClass;
    if(formContainer.classList.contains(showClass)) {
      pushEvent('show-form');
      observer.disconnect();
    }
  }

  function pushEvent(action) {
    if (!dataLayer || !action || !formContainer) return;
    var label = formContainer.dataset.optin || undefined;
    dataLayer.push({
      'event': 'gaEvent',
      'eventCategory': 'optin',
      'eventAction': action,
      'eventLabel': label,
      'eventValue': undefined
    });
  }

  init();
})(window.dataLayer);
