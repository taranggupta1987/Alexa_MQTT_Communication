We have used Node4.3 for this demo.

*https://developer.amazon.com/home.html*

*https://console.aws.amazon.com*

Lambda Function
===============

Use index.js for creating the lambda function.

*Note: Add triggers: Alexa Skills Kit*


Alexa console
=================

**Skill Information**

- Invocation Name 
  - Automation Demo



**Interaction Model**

- Intent Schema

```
{
  "intents": [
    {
      "slots": [
        {
          "name": "command",
          "type": "LIST_OF_COMMAND"
        },
        {
          "name": "color",
          "type": "LIST_OF_COLOR"
        }
      ],
      "intent": "led"
    },
    {
      "intent": "AMAZON.YesIntent"
    },
    {
      "intent": "AMAZON.NoIntent"
    },
    {
      "intent": "ledoff"
    },
    {
      "intent": "bulbon"
    },
    {
      "intent": "bulboff"
    }
  ]
}
```


![Custom Slot Type Image](https://github.com/taranggupta1987/Alexa_MQTT_Communication/blob/taranggupta1987-image/Screen%20Shot%202018-01-02%20at%207.12.05%20PM.png)

**Sample Utterances**

```
led turn {command} the {color} lights
ledoff turn off the light
ledoff turn on the lights
bulbon turn on the bulb
bulboff turn off the bulb
```


*Note: **npm install** may required for this demo**
