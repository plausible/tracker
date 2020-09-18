var location = window.location
var document = window.document
var domain = location.hostname
var plausibleHostHost = 'https://plausible.io'

module.exports = function trigger(eventName, options) {
  if (/^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/.test(location.hostname) || location.protocol === 'file:') return console.warn('Ignoring event on localhost');

  var payload = {}
  payload.n = eventName
  payload.u = location.href
  payload.d = domain
  payload.r = document.referrer || null
  payload.w = window.innerWidth
  payload.h = options.hashMode || false

  var request = new XMLHttpRequest();
  request.open('POST', plausibleHost + '/api/event', true);
  request.setRequestHeader('Content-Type', 'text/plain');

  request.send(JSON.stringify(payload));

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      options && options.callback && options.callback()
    }
  }
}

module.exports.init = function init(theDomain, theHost) {
  domain = configuredDomain
  plausibleHost = theHost
}

