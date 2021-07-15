(function (window, undefined) {

    document.getElementById('playerInfoSwitch').addEventListener('click', () => {
         document.getElementById('playerInfo').classList.toggle("beFlex")
    })

    let audiomap = [ 'currentSrc', 'src','error', 'networkState', 'readyState', 'preload', 'buffered', 'played', 'seekable', 'seeking', 'currentTime', 'startTime', 'duration', 'paused', 'defaultPlaybackRate', 'playbackRate', 'ended', 'autoplay', 'loop', 'controls', 'volume', 'muted'];
    let ctxmap = ['masterVolume.gain.value','delayTime.delayTime.value','delayFilter.frequency.value','delayGain.gain.value','stereoPanner.pan.value','analyser.fftSize'];
    window.setInterval(function () {
        var audiostr = `<span>window.innerWidth:${window.innerWidth}</span><span>window.innerHeight:${window.innerHeight}</span>`;

        for (var i = 0, j = audiomap.length; i < j; i++) {
            audiostr += '<span>' + audiomap[i] + ' : ' + audio[audiomap[i]] + '</span>\n';
        }

        document.getElementById('audioInfo').innerHTML = audiostr;

        var ctxstr = '';

        for (var i = 0, j = ctxmap.length; i < j; i++) {
            ctxstr += '<span>' + ctxmap[i] + ' : ' + eval(ctxmap[i]) + '</span>';
        }

        document.getElementById('ctxInfo').innerHTML = ctxstr
    }, 100);
})(window);