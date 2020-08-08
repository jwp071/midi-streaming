var soundMapping = {
    "21": {
        noteStr: "Splash",
        audioObj: new Audio("../sounds/Kit 3 - Acoustic/CyCdh_K3OpHat-01.wav"),
        animateClass: "hitCrash0",
        stickAnimation: {
            position: 'right',
            stickClass: 'splash1'
        },
        id: "splash1"
    },
    "23": {
        noteStr: "Hi-hat Half Open",
        audioObj: new Audio("../sounds/Kit 3 - Acoustic/CyCdh_K3HfHat.wav"),
        animateClass: null,
        stickAnimation: {
            position: 'right',
            stickClass: 'open1L'
        },
        id: null
    },
    "36": {
        noteStr: "Bass Drum",
        audioObj: new Audio("../sounds/Kit 3 - Acoustic/CyCdh_K3Kick-03.wav"),
        animateClass: "hitPedal",
        stickAnimation: null,
        id: "pedalkik1"
    },
    "38": {
        noteStr: "Snare Drum",
        audioObj: "../sounds/Alesis Surge/snare.wav",
        // audioObj: new Audio("../sounds/Alesis Surge/snare.wav")
        animateClass: null,
        stickAnimation: {
            position: "left",
            stickClass: "snare1L"
        },
        id: null
    },
    "39": {
        noteStr: "Tom 3 Rim",
        audioObj: null,
        animateClass: null,
        stickAnimation: {
            position: null,
            stickClass: null
        },
        id: null
    },
    "40": {
        noteStr: "Snare Rim",
        audioObj: new Audio("../sounds/Alesis Surge/snare-rim-cut.wav"),
        animateClass: null,
        stickAnimation: {
            position: null,
            stickClass: null
        },
        id: null
    },
    "41": {
        noteStr: "Tom 3",
        audioObj: null,
        animateClass: null,
        stickAnimation: {
            position: null,
            stickClass: null
        },
        id: null
    },
    "42": {
        noteStr: "Highhat Closed Hit",
        audioObj: "../sounds/Alesis Surge/hh-closed-cut.wav",
        // audioObj: new Audio("../sounds/Alesis Surge/hh-closed-cut.wav")
        animateClass: "hitHi",
        stickAnimation: {
            position: 'right',
            stickClass: 'hihat1R'
        },
        id: "hihat1"
    },
    "43": {
        noteStr: "Floor Tom",
        audioObj: new Audio("../sounds/Alesis Surge/floor-tom-cut.wav"),
        animateClass: null,
        stickAnimation: {
            position: 'right',
            stickClass: 'tom3'
        },
        id: null
    },
    "44": {
        noteStr: "Hi-Hat Pedal",
        audioObj: new Audio("../sounds/Alesis Surge/hh-closing-cut.wav"),
        animateClass: null,
        stickAnimation: {
            position: null,
            stickClass: null
        },
        id: "pedalhihat1"
    },
    "45": {
        noteStr: "Tom 2",
        audioObj: new Audio("../sounds/Alesis Surge/tom2-cut.wav"),
        animateClass: null,
        stickAnimation: {
            position: 'right',
            stickClass: 'tom2'
        },
        id: null
    },
    "46": {
        noteStr: "Highhat Open",
        audioObj: new Audio("../sounds/Kit 3 - Acoustic/CyCdh_K3OpHat-02.wav"),
        animateClass: null,
        stickAnimation: {
            position: 'right',
            stickClass: 'open1L'
        },
        id: null
    },
    "47": {
        noteStr: "Tom 2 Rim",
        audioObj: new Audio("../sounds/Kit 3 - Acoustic/CyCdh_K3Crash-04.wav"),
        animateClass: null,
        stickAnimation: {
            position: null,
            stickClass: null
        },
        id: null
    },
    "48": {
        noteStr: "Tom 1",
        audioObj: new Audio("../sounds/Alesis Surge/tom1-cut.wav"),
        animateClass: null,
        stickAnimation: {
            position: 'left',
            stickClass: "tom1"
        },
        id: null
    },
    "49": {
        noteStr: "Crash Cymbal",
        audioObj: new Audio("../sounds/Kit 3 - Acoustic/crash.wav"),
        animateClass: "hitCrash75L",
        stickAnimation: {
            position: "left",
            stickClass: "crash2"
        },
        id: "crash2"
    },
    "50": {
        noteStr: "Tom 1 Rim",
        audioObj: new Audio("../sounds/Kit 3 - Acoustic/CyCdh_K3Crash-03.wav"),
        animateClass: null,
        stickAnimation: {
            position: null,
            stickClass: null
        },
        id: null
    },
    "51": {
        noteStr: "Ride Cymbal",
        audioObj: new Audio("../sounds/Alesis Surge/ride-cut.wav"),
        animateClass: "hitRide",
        stickAnimation: {
            position: "right",
            stickClass: "ride1"
        },
        id: "ride1"
    },
    "57": {
        noteStr: "Crash 2",
        audioObj: null,
        animateClass: "hitCrash75L",
        stickAnimation: {
            position: "left",
            stickClass: "crash2"
        },
        id: "crash2"
    },
    "58": {
        noteStr: "Floor Tom Rim",
        audioObj: new Audio("../sounds/Kit 3 - Acoustic/CyCdh_K3Crash-06.wav"),
        animateClass: null,
        stickAnimation: {
            position: null,
            stickClass: null
        },
        id: null
    }
}

module.exports = soundMapping