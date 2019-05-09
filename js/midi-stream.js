var WebSocket = require('ws');
var soundMap = require('../js/sound-mapping.js');
var $ = require('jQuery');
const fs = require('fs');
const { dialog } = require('electron').remote;
const sleep = require('../js/sleep.js');

var WEBSOCKET_PORT = 3001

var streamToClient = false;
var writeToFile = false;
var wstream;

var midiFilesArr = [];

function radioSelected() {
    console.log(document.getElementById("streamTrue").checked)
    streamToClient = document.getElementById("streamTrue").checked;
}

//WebSocket Server
var socketServer = new WebSocket.Server({ port: WEBSOCKET_PORT, perMessageDeflate: false });
socketServer.connectionCount = 0;
socketServer.on('connection', function (socket, upgradeReq) {
    socketServer.connectionCount++;
    console.log(
        'New WebSocket Connection: ',
        (upgradeReq || socket.upgradeReq).socket.remoteAddress,
        (upgradeReq || socket.upgradeReq).headers['user-agent'],
        '(' + socketServer.connectionCount + ' total)'
    );
    document.getElementById("generalInfo").innerText = 'New WebSocket Connection: ' +
        (upgradeReq || socket.upgradeReq).socket.remoteAddress +
        (upgradeReq || socket.upgradeReq).headers['user-agent'] +
        '(' + socketServer.connectionCount + ' total)';

    socket.on('close', function () {
        socketServer.connectionCount--;
        console.log(
            'Disconnected WebSocket (' + socketServer.connectionCount + ' total)'
        );

        document.getElementById("generalInfo").innerText = 'Disconnected WebSocket (' + socketServer.connectionCount + ' total)'
    });
});
socketServer.broadcast = function (data) {
    socketServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

console.log('Awaiting WebSocket connections on ws://127.0.0.1:' + WEBSOCKET_PORT + '/');

var midiAccess = null;
navigator.requestMIDIAccess().then(onMIDISuccess, onMidiAccessFailure);

function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
    }

    midiAccess.onstatechange = function (e) {

        // Print information about the (dis)connected MIDI controller
        console.log("port name: " + e.port.name)
        console.log("port manufacturer: " + e.port.manufacturer)
        console.log("port state: " + e.port.state)

        onMIDISuccess(midiAccess);
    };
}

function getMIDIMessage(message) {
    // if (message.data[0] != 248) {
    //     console.log(message.data);
    // }

    if (streamToClient) {
        socketServer.broadcast(message.data);
    } else {
        convertMidiToAudio(message);
    }

    if (writeToFile) {

        var d = new Date();
        if (midiRecordingInitiated) {
            var path = "midi_files/" + 'DrumRecording' + (d.getMonth() + 1) + "-" + d.getDate() + "-" + d.getFullYear() + "-" + d.getHours() + "-" + d.getMinutes() + '.midi';
            wstream = fs.createWriteStream(path);
            document.getElementById("midiRecordingMsg").innerHTML = "Midi recording to " + path;
            midiRecordingInitiated = false;
        }
        else {
            wstream.write(message.data);
        }
    }
}

function convertMidiToAudio(message) {
    var command = message.data[0];
    var note = message.data[1];

    // a velocity value might not be included with a noteOff command
    var velocity = (message.data.length > 2) ? message.data[2] : 0;

    if (command != 248) {

        document.getElementById("command").innerText = command;
        try {
            document.getElementById("note").innerText = soundMap[note].noteStr;

            if (velocity != 0) {
                document.getElementById("velocity").innerText = velocity;
                playTone(note, velocity);
            }
        } catch (e) {
            console.error(e.message);
        }
    }
}

/**
 * Sets the appropriate booleans to true to write to a midi file
 */
function recordMidi() {
    console.log("starting recording");
    var stopRecordBtn = document.getElementById('stopRecordBtn');
    var startRecordBtn = document.getElementById('startRecordBtn');
    stopRecordBtn.style.display = "inline";
    startRecordBtn.style.display = "none";

    writeToFile = true;
    midiRecordingInitiated = true;
}

function stopRecordingMidi() {
    console.log("stopping recording")

    var stopRecordBtn = document.getElementById('stopRecordBtn');
    var startRecordBtn = document.getElementById('startRecordBtn');
    stopRecordBtn.style.display = "none";
    startRecordBtn.style.display = "inline";

    writeToFile = false;
    midiRecordingInitiated = false;
    if (wstream) {
        wstream.close();
    }
}

function onMidiAccessFailure(error) {
    console.log('Oops. Something went wrong with requestMIDIAccess', error.code);
}

function fromDir(startPath, filter) {

    var availableMidis = document.getElementById("availableMidis");

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        availableMidis.innerHTML = "No directory found at " + startPath;
        availableMidis.style.color = "red";
        return;
    }

    var files = fs.readdirSync(startPath);
    console.log(files);
    for (var i = 0; i < files.length; i++) {
        var filePath = startPath + files[i];
        var stat = fs.lstatSync(filePath);
        if (stat.isDirectory()) {
            fromDir(filePath, filter); //recurse
        }
        else if (filePath.indexOf(filter) >= 0) {
            console.log('-- found: ', filePath);
            midiFilesArr.push({ 'fullPath': filePath, 'mtimeMs': stat.mtimeMs, 'name': files[i] });
        }
    }
    if (midiFilesArr.length <= 0) {
        availableMidis.innerHTML = "No recorded midis could be located.";
        availableMidis.style.color = "red";
    } else {
        midiFilesArr.sort((a, b) => b.mtimeMs - a.mtimeMs); // Sort Files in descending order with respect to last modified time
        for (var ndx = 0; ndx < midiFilesArr.length; ndx++) {

            // Only displays the 10 most recently modified files
            if (ndx < 10) {
                availableMidis.innerHTML += '<button id="btnPlayback' + ndx
                    + '" class="btn btn-primary" style="margin-top: 10px" onclick="startMidiPlayer(\''
                    + midiFilesArr[ndx].fullPath + '\')">' + midiFilesArr[ndx].name + '</button><br>';
            }
        }
    }
}

function chooseMidiFile() {

    dialog.showOpenDialog(
        {
            title: 'Choose Midi File for Playback',
            defaultPath: "midi_files/",
            filters: [{ name: 'Midis', extensions: ["mid", "midi"] }],
        },
        (filePaths) => {
            // fileNames is an array that contains all the selected
            if (filePaths === undefined || filePaths.length <= 0) {
                console.log("No file selected");
                return;
            }

            console.log(filePaths[0]);
            startMidiPlayer(filePaths[0]);
        }
    );
}

function startMidiPlayer(filePath) {
    var fileData = {
        "data": []
    }

    var myBar = document.getElementById("myBar");
    var width = 0;

    fs.open(filePath, 'r', async function (status, fd) {
        if (status) {
            console.log(status.message);
            return;
        }
        // var buffer = Buffer.alloc(100);
        var buffer = new Uint8Array(3);
        var fileSize = getFilesizeInBytes(filePath);
        var ndx = 0;
        var readLength = 1; // bytes to read
        while (true) {

            var num = fs.readSync(fd, buffer, 0, readLength, ndx);
            // console.log(buffer);

            if (buffer[0] == 248) {
                readLength = 1;
                ndx++;
                await sleep(23); // Average time between 248 messages
            } else {
                readLength = 3;
                num = fs.readSync(fd, buffer, 0, readLength, ndx);
                fileData.data = buffer;
                convertMidiToAudio(fileData);

                ndx += 3;
            }

            if (num === 0) {
                break;
            }

            width = Math.round((ndx / fileSize) * 100)

            myBar.style.width = width + '%';

            readLength = 1;
        }
    });

}

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats["size"]
    console.log('file size: ' + fileSizeInBytes);
    return fileSizeInBytes
}

window.onload = function () {
    fromDir("midi_files/", "mid");
    updateVolVal();
}

function playInstrument(note) {
    var volume = document.getElementById("volRange").value;
    volume = volume * 127;
    console.log("volume: " + volume);

    playTone(note, volume)
}

function updateVolVal() {
    document.getElementById("volValue").innerText = document.getElementById("volRange").value;
}