Package.describe({
  name: 'teamha:mercadopago',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Mercadopago node sdk wrapped for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/HA-Team/meteor-mercadopago.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('meteorhacks:async@1.0.0', ['server']);
  api.addFiles('mercadopago.js', ['server']);
  api.export('MercadoPago');
});

Npm.depends({
  "mercadopago": "0.3.3"
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('teamha:mercadopago');
  api.addFiles('mercadopago-tests.js');
});
