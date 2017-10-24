var util = require('util');
var bleno = require('bleno');
var pizza = require('./pizza');

function adxlXYZCharacteristic(pizza) {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330002',
    properties: ['notify', 'write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Bakes the pizza and notifies when done baking.'
      })
    ]
  });

  this.pizza = pizza;
}

util.inherits(adxlXYZCharacteristic, bleno.Characteristic);

adxlXYZCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 2) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    var temperature = data.readUInt16BE(0);
    var self = this;
    this.pizza.on('ready', function(result) {
      if (self.updateValueCallback) {
        var data = new Buffer(8 * 3);
        data.writeDoubleBE(result[0], 0);
        data.writeDoubleBE(result[1], 8);
        data.writeDoubleBE(result[2], 16);
        self.updateValueCallback(data);
      }
    });
    this.pizza.bake(temperature);
    callback(this.RESULT_SUCCESS);
  }
};

module.exports = adxlXYZCharacteristic;
