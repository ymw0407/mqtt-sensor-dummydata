const mosquitto = require("mqtt");
const mqtt = require("./mqtt_lib");

const max = 100;
const min = 1;
const MQTT_IP = "127.0.0.1";

var pm1 = {value: 30, min: 0, max: 100};
var pm25 = {value: 30, min: 0, max: 100};
var pm10 = {value: 30, min: 0, max: 100};

var temp = {value: 20, min: -20, max: 40};
var humi = {value: 50, min: 0, max: 100};
var alti = {value: 10000, min: 8000, max: 12000};
var press = {value: 1000, min: 800, max: 1200};
// --------------- function --------------
const createRandNum = (min, max) => {
    var ntemp = Math.floor(Math.random() * (max - min + 1)) + min;
    return ntemp;
};

const randomIncDec = (data) => {
    return new Promise((resolve) => {
        let diff;
        if (data.min < data.value < data.max) {
            diff = createRandNum(-2, 2);
        } else if (data.value <= data.min) {
            diff = createRandNum(0, 1);
        } else if (data.value >= data.max) {
            diff = createRandNum(-1, 0);
        }
        data.value -= diff
        setTimeout(() => resolve("random!"), 200);
    });
};


const mqttSend = async () => {
    await randomIncDec(pm1).then((result) => {console.log(result)});
    await randomIncDec(pm25).then((result) => {console.log(result)});
    await randomIncDec(pm10).then((result) => {console.log(result)});
    pms = JSON.stringify({pm1: pm1.value, pm25: pm25.value, pm10: pm10.value})
    console.log(pms)
    mqtt.publish("sensor/pms", pms)
    await randomIncDec(temp).then((result) => {console.log(result)});
    await randomIncDec(humi).then((result) => {console.log(result)});
    await randomIncDec(alti).then((result) => {console.log(result)});
    await randomIncDec(press).then((result) => {console.log(result)});
    bme = JSON.stringify({temp: temp.value, humi: humi.value, alti: alti.value, press: press.value})
    console.log(bme)
    mqtt.publish("sensor/bme", bme)
    mqttSend();
};

// --------------- function --------------

// --------------- main code ---------------
mqtt.init(mosquitto);
client = mqtt.connect(MQTT_IP)
mqttSend();
// --------------- main code ---------------