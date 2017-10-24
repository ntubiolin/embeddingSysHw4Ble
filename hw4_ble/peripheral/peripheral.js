var util = require('util');
var adxlServiceUuid = '13333333333333333333333333333337';
var adxlC2PCharacteristicUuid = '13333333333333333333333333330001';
var adxlXYZCharacteristicUuid = '13333333333333333333333333330002';
//
// Require bleno peripheral library.
// https://github.com/sandeepmistry/bleno
//
var bleno = require('bleno');

//
var pizza = require('./pizza');
var AdxlService = require('./adxl-service');
//


//
// A name to advertise our Pizza Service.
//
var name = 'adxlSquart';
var adxlService = new AdxlService(new pizza.Pizza());

//
// Wait until the BLE radio powers on before attempting to advertise.
// If you don't have a BLE radio, then it will never power on!
//
bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    //
    bleno.startAdvertising(name, [adxlServiceUuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    //
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    //
    bleno.setServices([
      adxlService
    ]);
  }
});
