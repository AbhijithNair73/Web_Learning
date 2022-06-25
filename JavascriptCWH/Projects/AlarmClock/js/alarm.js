console.log('Welcome to alarm');
    let liveElem = document.getElementById("live");
    liveElem.addEventListener("onload",myFunc());
    function myFunc()
    {
        setInterval(function(){
            liveElem.innerHTML=Date();
        },1000);
    }
    var audio = new Audio('./Audio/duo.mp3');

// let input = document.getElementById("formid");
//   input.addEventListener("submit", (event) => {
//       console.log('prevent default');
//       event.preventDefault();
//       event.preventDefault();
//       console.log('prevent default2');
//   })

// function to play the alarm ring tone
function ringBell() {
    audio.loop = true;
    audio.play();
}

// This function will run whenever alarm is set from the UI
function setAlarm(e) {
    console.log('On click worked');
    const alarm = document.getElementById('alarm');
    console.log(`Setting Alarm for ${alarm.value}...`);
    var alarmDate = new Date(alarm.value);
    console.log(`Setting Alarm for ${alarmDate}...`);
    let now = new Date();
    let timeToAlarm = alarmDate - now;
    console.log(timeToAlarm);
    if(timeToAlarm>=0){
        setTimeout(() => {
            console.log("Ringing now")
            ringBell();
        }, timeToAlarm);
    }
}