(function() {

  var COUNTDOWN_SELECTOR = '.discount-countdown-container';
  var HOURS_CLASS = 'discount-countdown-time discount-countdown-hours';
  var MINUTES_CLASS = 'discount-countdown-time discount-countdown-minutes';
  var SECONDS_CLASS = 'discount-countdown-time discount-countdown-seconds';
  var COUNTDOWN_LABEL_CLASS = 'discount-countdown-label';
  var COUNTDOWN_TIMER_CLASS = 'discount-countdown-timer';

  var SEC_IN_MILLISECS = 1000;
  var MINUTE_IN_MILLISECS = SEC_IN_MILLISECS * 60;
  var HOUR_IN_MILLISECS = MINUTE_IN_MILLISECS * 60;

  var countdownEl;
  var loadTime;
  var endTime;
  var remaining;
  var hours;
  var minutes;
  var seconds;
  var hoursEl;
  var minutesEl;
  var secondsEl;


  function init() {
    countdownEl = document.querySelector(COUNTDOWN_SELECTOR);
    if (!countdownEl) {
      return;
    }

    endTime = countdownEl.dataset.endsAt;
    if (endTime) {
      endTime = new Date(endTime);
    }

    var textEl = document.createElement('span');
    textEl.setAttribute('class', COUNTDOWN_LABEL_CLASS);
    textEl.textContent = 'Launch discount ends';

    var timerEl = document.createElement('span');
    timerEl.setAttribute('class', COUNTDOWN_TIMER_CLASS);

    hoursEl = document.createElement('span');
    hoursEl.setAttribute('class', HOURS_CLASS);

    minutesEl = document.createElement('span');
    minutesEl.setAttribute('class', MINUTES_CLASS);

    secondsEl = document.createElement('span');
    secondsEl.setAttribute('class', SECONDS_CLASS);

    timerEl.appendChild(hoursEl);
    timerEl.appendChild(document.createTextNode(':'));
    timerEl.appendChild(minutesEl);
    timerEl.appendChild(document.createTextNode(':'));
    timerEl.appendChild(secondsEl);

    countdownEl.appendChild(textEl);
    countdownEl.appendChild(timerEl);

    update();
  }

  function update() {
    remaining = endTime.getTime() - new Date().getTime();

    if (remaining < 0) {
      remaining = 0;
    }

    hours = pad(Math.floor(remaining / HOUR_IN_MILLISECS).toString(10));
    remaining = remaining % HOUR_IN_MILLISECS;
    minutes = pad(Math.floor(remaining / MINUTE_IN_MILLISECS).toString(10));
    remaining = remaining % MINUTE_IN_MILLISECS;
    seconds = pad(Math.floor(remaining / SEC_IN_MILLISECS).toString(10));

    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    window.setTimeout(update, 1000);
  }

  function pad(str) {
    return (str.length === 1) ? '0' + str : str;
  }

  document.querySelector && init();

})();
