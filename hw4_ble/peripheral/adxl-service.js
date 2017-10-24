var util = require('util');
var bleno = require('bleno');

var adxlXYZCharacteristic = require('./adxl-xyz.js');
var adxlC2PCharacteristic = require('./adxl-c2p.js');

function AdxlService(adxl) {
    bleno.PrimaryService.call(this, {
        uuid: '13333333333333333333333333333337',
        characteristics: [
            new adxlC2PCharacteristic(adxl),
            new adxlXYZCharacteristic(adxl),
        ]
    });
}
util.inherits(AdxlService, bleno.PrimaryService);

module.exports = AdxlService;
