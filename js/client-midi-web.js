var soundMap = soundMapping;
var webSocket = null;
var useRightStick = true;

console.log(soundMap)

function connectToServer() {
    var serverIP = document.getElementById("serverIPAddress").value;
    var serverPort = document.getElementById("serverPort").value;

    // webSocket = new WebSocket('ws://192.168.1.28:3001');
    console.log("Trying to connect to: " + 'ws://' + serverIP + ':' + serverPort);
    webSocket = new WebSocket('ws://' + serverIP + ':' + serverPort);
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

                startAnimation(note);
            }
        }
    }

    webSocket.onerror = function (message) {
        console.log('Error:' + message);
    }

    webSocket.onclose = function (message) {
        document.getElementById("generalInfo").innerText = "Client/Server connection closed!";
    }
}

function disconnectFromServer() {
    if (webSocket) {
        webSocket.close();
    }
}

function startAnimation(note) {
    var rightStick = document.getElementById('Rstick');
    var leftStick = document.getElementById('Lstick');

    var tempObj = soundMap[note.toString()];
    if (tempObj.animateClass) {

        if (tempObj.stickAnimation) {
            if (useRightStick) {
                rightStick.classList.add('R' + tempObj.stickAnimation.stickClass);

                // Remove stick animation when transition is finished
                $("#Rstick")
                    .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
                        function (e) {
                            console.log('Right stick animation ended!')
                            rightStick.classList.remove('R' + tempObj.stickAnimation.stickClass);
                            $(this).off(e);
                        });
            } else {
                leftStick.classList.add('L' + tempObj.stickAnimation.stickClass);

                // Remove stick animation when transition is finished
                $("#Lstick")
                    .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
                        function (e) {
                            console.log('Left stick animation ended!')
                            leftStick.classList.remove('L' + tempObj.stickAnimation.stickClass);
                            $(this).off(e);
                        });
            }

            useRightStick = !useRightStick; // Toggle which stick to use
        }

        if (tempObj.id) {
            var element = document.getElementById(tempObj.id);
            element.classList.add(tempObj.animateClass);

            if (note == '36') {
                document.getElementById('beaterkik1').classList.add('hitBeater');
            }

            // Remove animation when transition is finished
            $("#" + tempObj.id)
                .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
                    function (e) {
                        console.log('Animation ended!')
                        element.classList.remove(tempObj.animateClass);
                        if (note == '36') {
                            document.getElementById('beaterkik1').classList.remove('hitBeater');
                        }
                        $(this).off(e);
                    });
        }
    } else if (tempObj.stickAnimation) {

        if (useRightStick) {
            rightStick.classList.add('R' + tempObj.stickAnimation.stickClass);

            // Remove stick animation when transition is finished
            $("#Rstick")
                .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
                    function (e) {
                        console.log('Right stick animation ended!')
                        rightStick.classList.remove('R' + tempObj.stickAnimation.stickClass);
                        $(this).off(e);
                    });
        } else {
            leftStick.classList.add('L' + tempObj.stickAnimation.stickClass);

            // Remove stick animation when transition is finished
            $("#Lstick")
                .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
                    function (e) {
                        console.log('Left stick animation ended!')
                        leftStick.classList.remove('L' + tempObj.stickAnimation.stickClass);
                        $(this).off(e);
                    });
        }

        useRightStick = !useRightStick; // Toggle which stick to use
    }
}