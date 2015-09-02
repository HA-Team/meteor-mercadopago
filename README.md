# MercadoPago SDK for Meteor JS

This library is a wrap of [nodejs mercadopago sdk](https://github.com/mercadopago/sdk-nodejs) for meteor.

* [Install](#install)
* [Basic usage](#basic-usage)
* [Basic checkout](#basic-checkout)
* [Customized checkout](#custom-checkout)
* [Generic methods](#generic-methods)

<a name="install"></a>
## Install

```
$ meteor add ha:mercadopago
```

## Basic Usage
### Config
Get your ``clientID/ClientSecret`` or ``accessToken`` whether you use basic or custom checkout (See more in [basic checkout](#basic-checkout) and [customized checkout](#custom-checkout)). Add your credentials to your meteor config.

```json
{
  "mercadopago": {
    "clientID": "yourClientID",
    "clientSecret": "yourClientSecret"
  }
}
```

Start meteor with the config file.

```
meteor --settings [settings.json]
```

If everything went fine you should have (server side) access to the variable ``MercadPago``.

### Sync, Promise and Callback
All methods of ``MercadoPago`` can be called in a synchronous or asynchronous way. All methods have a regular version (sync) and one starting with a lowdash (async). For example you have three ways of using the method ``createPreference``.

#### Sync
```
MercadoPago.createPreference(p)
```

#### Callback (Asyc)
```
MercadoPago._createPreference(p).then(
  function (preference) {
    console.log(preference);
  },
  function (error) {
    console.log (error);
  });
```

#### Promise (Async)
```
MercadoPago._createPreference(p, function (err, preference){
  if (err) {
    console.log (err);
  } else {
    console.log (preference);
  }
});
```

### Primitive access
You have access to the underlying node module and the current mercadopago instance in the following vars
```js
MercadoPago._MP // Node module
Mercadopago.mp // Mercadopago node instance
```

You can checkout how to use the module in the [official repo](https://github.com/mercadopago/sdk-nodejs).

## Basic checkout

### Configure your credentials

* Get your **CLIENT_ID** and **CLIENT_SECRET** in the following address:
    * Argentina: [https://www.mercadopago.com/mla/herramientas/aplicaciones](https://www.mercadopago.com/mla/herramientas/aplicaciones)
    * Brazil: [https://www.mercadopago.com/mlb/ferramentas/aplicacoes](https://www.mercadopago.com/mlb/ferramentas/aplicacoes)
    * México: [https://www.mercadopago.com/mlm/herramientas/aplicaciones](https://www.mercadopago.com/mlm/herramientas/aplicaciones)
    * Venezuela: [https://www.mercadopago.com/mlv/herramientas/aplicaciones](https://www.mercadopago.com/mlv/herramientas/aplicaciones)
    * Colombia: [https://www.mercadopago.com/mco/herramientas/aplicaciones](https://www.mercadopago.com/mco/herramientas/aplicaciones)
    * Chile: [https://www.mercadopago.com/mlc/herramientas/aplicaciones](https://www.mercadopago.com/mlc/herramientas/aplicaciones)
* Add the credentials to your meteor config.

```json
{
  "mercadopago": {
    "clientID": "yourClientID",
    "clientSecret": "yourClientSecret"
  }
}
```


### Preferences

#### Get an existent Checkout preference

```javascript
MercadoPago.getPreference(preferenceID);
```

#### Create a Checkout preference

```javascript
var preference = {
  "items": [
    {
      "title": "Test",
      "quantity": 1,
      "currency_id": "USD",
      "unit_price": 10.5
    }
  ]
};

MercadoPago.createPreference(preference);
```

#### Update an existent Checkout preference:

```javascript
var preference = {
  "items": [
    {
      "title": "Test Modified",
      "quantity": 1,
      "currency_id": "USD",
      "unit_price": 20.4
    }
  ]
};

MercadoPago.updatePreference(preferenceID, preference);
```

### Payments/Collections

#### Search for payments

```javascript
var filters = {
  "id": null,
  "site_id": null,
  "external_reference": null
};

data = MercadoPago.searchPayment(filters);
console.log (JSON.stringify (data, null, 4);
```

#### Get payment data

```javascript
data = MercadoPago.getPayment(paymentId);
console.log(JSON.stringify(data, null, 4));
```

#### Cancel (only for pending payments)

```javascript
MercadoPago.cancelPayment(paymentID);
```

#### Refund (only for accredited payments)

```javascript
MercadoPago.refundPayment(paymentID);
```

<a name="custom-checkout"></a>
## Customized checkout

### Configure your credentials

* Get your **ACCESS_TOKEN** in the following address:
    * Argentina: [https://www.mercadopago.com/mla/account/credentials](https://www.mercadopago.com/mla/account/credentials)
    * Brazil: [https://www.mercadopago.com/mlb/account/credentials](https://www.mercadopago.com/mlb/account/credentials)
    * Mexico: [https://www.mercadopago.com/mlm/account/credentials](https://www.mercadopago.com/mlm/account/credentials)
    * Venezuela: [https://www.mercadopago.com/mlv/account/credentials](https://www.mercadopago.com/mlv/account/credentials)
    * Colombia: [https://www.mercadopago.com/mco/account/credentials](https://www.mercadopago.com/mco/account/credentials)
* Add the credentials to your meteor config.

```json
{
  "mercadopago": {
    "accessToken": "yourAccessToken"
  }
}
```
### Create payment

```javascript
MercadoPago.post("/v1/payments", payment_data);
```

### Create customer

```javascript
MercadoPago.post("/v1/customers", {"email": "email@test.com"});
```

### Get customer

```javascript
MercadoPago.get("/v1/customers/CUSTOMER_ID");
```

* View more Custom checkout related APIs in Developers Site
    * Argentina: [https://www.mercadopago.com.ar/developers](https://www.mercadopago.com.ar/developers)
    * Brazil: [https://www.mercadopago.com.br/developers](https://www.mercadopago.com.br/developers)
    * Mexico: [https://www.mercadopago.com.mx/developers](https://www.mercadopago.com.mx/developers)
    * Venezuela: [https://www.mercadopago.com.ve/developers](https://www.mercadopago.com.ve/developers)
    * Colombia: [https://www.mercadopago.com.co/developers](https://www.mercadopago.com.co/developers)

<a name="generic-methods"></a>
## Generic methods

You can access any other resource from the MercadoPago API using the generic methods:

```javascript
// Get a resource, with optional URL params. Also you can disable authentication for public APIs
MercadoPago.get("/resource/uri", [params], [authenticate=true]);

// Create a resource with "data" and optional URL params.
MercadoPago.post("/resource/uri", data, [params]);

// Update a resource with "data" and optional URL params.
MercadoPago.put("/resource/uri", data, [params]);

// Delete a resource with optional URL params.
MercadoPago.delete("/resource/uri", [params]);
```

 For example, if you want to get the Sites list (no params and no authentication):

```javascript
sites = MercadoPago.get("/sites", null, false);
console.log(sites);
```
