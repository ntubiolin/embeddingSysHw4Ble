var util = require('util');
var bleno = require('bleno');
var pizza = require('./pizza');

function adxlC2PCharacteristic(pizza) {
  console.log('>>> Initializing adxlC2PCharacteristic');
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330001',
    properties: ['read', 'write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Pass a value from Cental to Peripheral.'
      })
    ]
  });

  this.pizza = pizza;
}

util.inherits(adxlC2PCharacteristic, bleno.Characteristic);

adxlC2PCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 1) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    this.pizza.toppings = data.readUInt8(0);
    console.log('>>>In adxlC2PCharacteristic.onWrite P got the value from C: ' + this.pizza.toppings);
    callback(this.RESULT_SUCCESS);
  }
};

adxlC2PCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    var data = new Buffer(2);
    data.writeUInt16BE(this.pizza.toppings, 0);
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = adxlC2PCharacteristic;
