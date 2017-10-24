this homework was implemented in Node language!!!
1. Prepare two rpi, named after rpi-central and rpi-peripheral.
2. Install ADXL345 sensor and npm install adxl345-sensor package on rpi-peripheral.
3. On rpi-peripheral, cd to peripheral dir and run "sudo node peripheral.js"
4. Run "sudo node central.js" on rpi-central
5. If everything works as expect, 
	1. the terminal output of rpi-central would be something like this:
      '''
      scanning...
      found peripheral: { localName: 'adxlSquart',
      txPowerLevel: undefined,
      manufacturerData: undefined,
      serviceData: [],
      serviceUuids: [ '13333333333333333333333333333337' ],
      solicitationServiceUuids: [],
      serviceSolicitationUuids: [] }
      found service: 13333333333333333333333333333337
      found characteristic: 13333333333333333333333333330001
      found characteristic: 13333333333333333333333333330002
      >>> In getADXLxyzInfo
      >>> c2pValue = �
      >>> C2P without err!
      >>> In read adxl xyz...
      The x value is: 0.38
      The y value is: 0.744
      The z value is: -0.684
      ---------------
      '''
	2. the terminal output of rpi-peripheral would be something like this:
      '''
      >>> Initializing adxlC2PCharacteristic
      Found ADXL345 device id 0xe5 on bus i2c-1, address 0x53
      ADXL345 initialization succeeded
      advertising...
      >>>In adxlC2PCharacteristic.onWrite P got the value from C: 133
      >>> x = 0.38
      >>> y = 0.744
      >>> z = -0.684
      >>> count: 
      >>> result x = 0.38
      >>> result y = 0.744
      >>> result z = -0.684
      '''
6. Observe the last three lines of the 2 outputs respectively, and you can find that the xyz axis datas have been passed from peripheral BLE device to central BLE devices.
