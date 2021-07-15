const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();
const stereoPanner = audioCtx.createStereoPanner();
const delayGain = audioCtx.createGain();
const delayFilter = audioCtx.createBiquadFilter();
const delayTime = audioCtx.createDelay();
const masterVolume = audioCtx.createGain();

const reverb = audioCtx.createConvolver();


// var irRRequest = new XMLHttpRequest();
//     irRRequest.open("GET", source, true);
//     irRRequest.responseType = "arraybuffer";
//     irRRequest.onload = function() {
//         audioCtx.decodeAudioData( irRRequest.response, 
//             function(buffer) { reverb.buffer = buffer; } );
//     }
//     irRRequest.send();

// function impulseResponse( duration, decay, reverse ) {
//     var sampleRate = audioContext.sampleRate;
//     var length = sampleRate * duration;
//     var impulse = audioContext.createBuffer(2, length, sampleRate);
//     var impulseL = impulse.getChannelData(0);
//     var impulseR = impulse.getChannelData(1);

//     if (!decay)
//         decay = 2.0;
//     for (var i = 0; i < length; i++){
//       var n = reverse ? length - i : i;
//       impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
//       impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
//     }
//     return impulse;
// }


// Master Chain
source.connect(analyser)
analyser.connect(stereoPanner)
stereoPanner.connect(masterVolume)

stereoPanner.connect(reverb)
reverb.connect(masterVolume)

masterVolume.connect(audioCtx.destination)
// Delay Chain
stereoPanner.connect(delayFilter)
delayFilter.connect(delayGain)
delayGain.connect(delayTime)
delayTime.connect(delayGain)
delayGain.gain.value /= 2
delayGain.connect(delayTime)
delayTime.connect(delayGain)
delayGain.gain.value /= 4
delayGain.connect(delayTime)
delayTime.connect(audioCtx.destination)

// masterVolume.gain.value = 1

const Init = document.getElementById("init");
Init.addEventListener('click', () => {
    Init.style.transition = "all .6s"
    Init.style.marginLeft = "-100vw"
    audioCtx.resume().then(() => {
        console.log('Playback resumed successfully');
    });
})