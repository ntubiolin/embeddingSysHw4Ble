var util = require('util');
var events = require('events');

const ADXL345 = require('adxl345-sensor');
const adxl345 = new ADXL345(); // defaults to i2cBusNo 1, i2cAddress 0x53
// Read ADXL345 three-axis acceleration, repeat
//
const getAcceleration = (cb1) => {
adxl345.getAcceleration(true) // true for g-force units, else false for m/s²
 .then((acceleration) => {
   //console.log(`acceleration = ${JSON.stringify(acceleration, null, 2)}`);
   var xyzArr = [acceleration['x'], acceleration['y'], acceleration['z']];
   console.log('>>> x = ' + xyzArr[0]);
   console.log('>>> y = ' + xyzArr[1]);
   console.log('>>> z = ' + xyzArr[2]);
   cb1(xyzArr);
   //setTimeout(getAcceleration, 1000);
 })
 .catch((err) => {
   console.log(`ADXL345 read error: ${err}`);
   setTimeout(getAcceleration, 2000);
 });
};

//////
// Initialize the ADXL345 accelerometer
//
adxl345.init()
  .then(() => {
    console.log('ADXL345 initialization succeeded');
    //getAcceleration();
  })
  .catch((err) => console.error(`ADXL345 initialization failed: ${err} `));

var PizzaCrust = {
  NORMAL:    0,
  DEEP_DISH: 1,
  THIN:      2,
};

var PizzaToppings = {
  NONE:           0,
  PEPPERONI:      1 << 0,
  MUSHROOMS:      1 << 1,
  EXTRA_CHEESE:   1 << 2,
  BLACK_OLIVES:   1 << 3,
  CANADIAN_BACON: 1 << 4,
  PINEAPPLE:      1 << 5,
  BELL_PEPPERS:   1 << 6,
  SAUSAGE:        1 << 7,
};

var PizzaBakeResult = {
  HALF_BAKED: 0,
  BAKED:      1,
  CRISPY:     2,
  BURNT:      3,
  ON_FIRE:    4
};

function Pizza() {
  events.EventEmitter.call(this);
  this.toppings = PizzaToppings.NONE;
  this.crust = PizzaCrust.NORMAL;
}

util.inherits(Pizza, events.EventEmitter);

Pizza.prototype.bake = function(temperature) {
  //var i = 0;
  var time = temperature * 10 ;
  //while(i < 10){
     
     var self = this;
     //setTimeout(function(){
       getAcceleration(function(result){
         console.log('>>> count: ');
         console.log('>>> result x = ' + result[0]);
         console.log('>>> result y = ' + result[1]);
         console.log('>>> result z = ' + result[2]);
         
         self.emit('ready', result);
       })
       //}, time);
     
     
     
     /*setTimeout(function() {
       getAcceleration(function(result){
         console.log('>>> x = ' + result[0]);
         console.log('>>> y = ' + result[1]);
         console.log('>>> z = ' + result[2]);
         self.emit('ready', result);
       });     
     
     }, time);
     */

     //i++;
  //}
};

module.exports.Pizza = Pizza;
module.exports.PizzaToppings = PizzaToppings;
module.exports.PizzaCrust = PizzaCrust;
module.exports.PizzaBakeResult = PizzaBakeResult;
