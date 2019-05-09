// const WebSocket = require('ws');

// var soundMap = require('../js/sound-mapping.js');

// console.log(soundMap.soundMapping)
// console.log(soundMap.toneMapping)

// const ws = new WebSocket('ws://127.0.0.1:3001');

// ws.on('open', function open() {
//   console.log('Client/server connection established');
//   //   ws.send('something');
// });

// ws.on('message', function incoming(data) {
//   // console.log('data received: ')
//   console.log(data);
//   var myObj = JSON.parse(data);
//   // document.getElementById("command").innerText = data.command;
//   // var noteStr = Object.keys(soundMap.soundMapping).find(key => soundMap.soundMapping[key] === note);
//   // document.getElementById("note").innerText = data.noteStr;
//   // document.getElementById("velocity").innerText = data.velocity;

//   if (myObj.command != 248) {
//     // console.debug(message)
//     // console.log("Command: " + myObj.command)
//     // console.log("note: " + myObj.note)
//     // console.log("velocity: " + myObj.velocity)
//     document.getElementById("command").innerText = myObj.command;
//     var noteStr = Object.keys(soundMap.soundMapping).find(key => soundMap.soundMapping[key] === myObj.note);
//     document.getElementById("note").innerText = noteStr;
//     document.getElementById("velocity").innerText = myObj.velocity;

//     if (velocity != 0) {
//       // console.log('velocity not equal 0!');
//       document.getElementById("velocity").innerText = myObj.velocity;
//       playTone(noteStr, myObj.velocity);
//     }
//   }
// });


var soundMap = require('../js/sound-mapping.js');

console.log(soundMap)

var webSocket = new WebSocket('ws://192.168.1.28:3001');
webSocket.binaryType = 'arraybuffer';

webSocket.onopen = function open() {
  console.log('Client/server connection established');
  document.getElementById("generalInfo").innerText = "Client/Server connection established!";
  //   ws.send('something');
}

webSocket.onmessage = function (message) {
  var bufferArr = new Uint8Array(message.data);

  document.getElementById("generalInfo").innerText = "Receiving information...";

  var command = bufferArr[0];
  var note = bufferArr[1];
  var velocity = (bufferArr.length > 2) ? bufferArr[2] : 0; // a velocity value might not be included with a noteOff command

  if (command != 248) {
    document.getElementById("command").innerText = command;
    document.getElementById("note").innerText = soundMap[note.toString()].noteStr;

    if (velocity != 0) {
      document.getElementById("velocity").innerText = velocity;
      playTone(note, velocity);
    }
  }
}