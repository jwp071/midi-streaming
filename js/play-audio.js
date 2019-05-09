/**
 * 
 * @param {*} note 
 * @param {*} velocity - int value from 0 to 127
 */
function playTone(note, velocity) {
  // console.log(soundMap.toneMapping[note])
  var audio = soundMap[note].audioObj;
  audio.currentTime = 0;
  if (note == "38") {
    if(velocity<85){
      velocity /= 8;
    }
    audio.volume = Math.sqrt(convertVolume(velocity))
    console.log(velocity)
  } else {
    audio.volume = convertVolume(velocity);
    // console.log('playing tone!');
  }

  audio.play();
}

function killTone(note) {
  var audio = soundMap[note].audioObj;
  audio.pause();
  audio.currentTime = 0;
}

function convertVolume(velocity) {
  if (velocity > 127) {
    velocity = 127;
  } else if (velocity < 0) {
    velocity = 0;
  }
  return velocity / 127;
}
