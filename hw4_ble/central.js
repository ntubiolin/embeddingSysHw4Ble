
var noble = require('noble');

var adxlServiceUuid = '13333333333333333333333333333337';
var adxlC2PCharacteristicUuid = '13333333333333333333333333330001';
var adxlXYZCharacteristicUuid = '13333333333333333333333333330002';

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // Once the BLE radio has been powered on, it is possible
    // to begin scanning for services. Pass an empty array to
    // scan for all services (uses more time and power).
    //
    console.log('scanning...');
    noble.startScanning([adxlServiceUuid], false);
  }
  else {
    noble.stopScanning();
  }
})

var adxlService = null;
var adxlC2PCharacteristic = null;
var adxlXYZCharacteristic = null;

noble.on('discover', function(peripheral) {
  // we found a peripheral, stop scanning
  noble.stopScanning();

  //
  // The advertisment data contains a name, power level (if available),
  // certain advertised service uuids, as well as manufacturer data,
  // which could be formatted as an iBeacon.
  //
  console.log('found peripheral:', peripheral.advertisement);
  //
  // Once the peripheral has been discovered, then connect to it.
  //
  peripheral.connect(function(err) {
    //
    // Once the peripheral has been connected, then discover the
    // services and characteristics of interest.
    //
    peripheral.discoverServices([adxlServiceUuid], function(err, services) {
      services.forEach(function(service) {
        //
        // This must be the service we were looking for.
        //
        console.log('found service:', service.uuid);

        //
        // So, discover its characteristics.
        //
        service.discoverCharacteristics([], function(err, characteristics) {

          characteristics.forEach(function(characteristic) {
            //
            // Loop through each characteristic and match them to the
            // UUIDs that we know about.
            //
            console.log('found characteristic:', characteristic.uuid);

            if (adxlC2PCharacteristicUuid == characteristic.uuid) {
              adxlC2PCharacteristic = characteristic;
            }else if (adxlXYZCharacteristicUuid == characteristic.uuid) {
              adxlXYZCharacteristic = characteristic;
            }
          })

          //
          // Check to see if we found all of our characteristics.
          //
          if (adxlC2PCharacteristic) {
            //
            // We did, so get xyz!
            //
            getADXLxyzInfo();
          }
          else {
            console.log('missing characteristics');
          }
        })
      })
    })
  })
})

function getADXLxyzInfo() {
   console.log('>>> In getADXLxyzInfo')
   var c2pValue = new Buffer(1);
   c2pValue.writeUInt8(133, 0);
   console.log('>>> c2pValue = ' + c2pValue);
   adxlC2PCharacteristic.write(c2pValue, false, function(err){
      if(!err){
         console.log('>>> C2P without err!');
         adxlXYZCharacteristic.on('read', function(data, isNotification){
            console.log('>>> In read adxl xyz...');       
            if (data.length === 8 * 3) {
              var resultX = data.readDoubleBE(0);
              var resultY = data.readDoubleBE(8);
              var resultZ = data.readDoubleBE(16);
              console.log('The x value is:', resultX);
              console.log('The y value is:', resultY);
              console.log('The z value is:', resultZ);
              console.log('---------------');
            }
            else {
              console.log('result length incorrect');
            }
          });
          adxlXYZCharacteristic.subscribe(function(err) {
            var temperature = new Buffer(2);
            temperature.writeUInt16BE(451, 0);
            adxlXYZCharacteristic.write(temperature, false, function(err) {
              if (err) {
                console.log('temp error');
              }
            });
          });
      }
   })
}

