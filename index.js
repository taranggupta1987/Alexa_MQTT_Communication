'use strict';

var Alexa = require('alexa-sdk');
var AWS = require('aws-sdk');

//Create you own AWS IOT endpoint 
var iot = new AWS.IotData({ endpoint: "https://wkjahdadhd.iot.us-east-1.amazonaws.com" });

var params = {
    topic: "YOUR_IOT_TOPIC",
    payload: "IF_REQUIRED",
    qos: "0" //QOS: 0, 1, 2
};

function publish(params,thisobj){

  var localobj = thisobj;
  iot.publish(params, function(err, data) {

          if (err) {
              console.log(err);
              localobj.emit(':ask', 'sorry operation failed');
          }
          console.log("success");
          localobj.emit(':ask', 'your operation completed successfully. Do you want continue, please say yes or no?');
  });
}

function onLaunchHelperFunction(thisintentobj){
    var message="welcome to alexa smart home automation skills, I can turn on and off lamp,switch on and off the fan.what would you like  me to do?";
    thisintentobj.emit(':ask', message);

}

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    var handlers = {

        'LaunchRequest': function() {
           this.emit(':ask', "Welcome to smart home automation. what would you like  me to do?");
        },
        'led':function(){
            var stringStr = event.request.intent.slots.color.value;
            var stringStrValue = event.request.intent.slots.command.value;

            params.payload = JSON.stringify({ 'color' : stringStr, 'value' :  stringStrValue});
            publish(params,this);
        },
        'ledoff':function(){
            params.payload = JSON.stringify({ 'color' : 'none', 'value' :  ' '});
            publish(params,this);

        },
        'bulbon':function(){
            params.payload = "bulbon";
            publish(params,this);
        
        },
        'bulboff':function(){
            params.payload = "bulboff";
            publish(params,this);

        },
        'Unhandled': function() {
            console.log("unhandled : " +this.event.request.intent.slots.string.value);
            this.emit(':ask', 'Sorry, I didn\'t get that. Try saying again.', 'Try saying again.');
         },
       
        'AMAZON.HelpIntent': function() {
            var message="welcome to smart home automation. what would you like me to do?";
            this.emit(':ask', message);
        },
       
       'AMAZON.YesIntent': function() {
            this.emit(':ask','what you want me to do?');
        },
        
        'AMAZON.NoIntent': function() {
            this.emit(':tell', 'Ok, see you next time!');
        }
    };
    alexa.registerHandlers(handlers);
    alexa.execute();
};
