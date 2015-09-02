MercadoPago = undefined;
var _MP = Npm.require('mercadopago');

var settings = Meteor.settings && Meteor.settings.mercadopago;
var simpleCheckout = settings && settings.clientId && settings.clientSecret;
var customCheckout = settings && settings.accessToken;
if (simpleCheckout || customCheckout) {
  // Intanciate MP
  var instance = simpleCheckout ? new _MP(settings.clientId, settings.clientSecret) : new _MP(settings.accessToken);
  instance.sandboxMode(settings.sandbox);
  var methods = ['getAccessToken', 'getPreference', 'createPreference', 'updatePreference', 'searchPayment', 'getPayment', 'cancelPayment', 'refundPayment', 'post', 'get', 'put', 'delete'];
  MercadoPago = {
    _MP: _MP,
    mp: instance,
  };
  methods.forEach(function(method) {
    MercadoPago[method] = Async.wrap(instance, method);
    MercadoPago['_' + method] = instance.method;
  });
} else {
  console.error('Mercadopago credentials not found on settings file. Be sure to start Meteor with --settings [filename.json]');
}
