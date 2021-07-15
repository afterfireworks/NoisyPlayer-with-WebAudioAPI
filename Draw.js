function Draw() {

    requestAnimationFrame(Draw);
    analyser.fftSize = 2048;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = 'rgba(0, 0, 0, .5)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2;
    let posX = window.innerWidth;
    let red = Math.round(Math.random() * 150);
    let green = Math.round(Math.random() * 0);
    let blue = Math.round(Math.random() * 150);

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] * 5 + 200);
        canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight * 2) + ',' + Math.floor(barHeight * 2) + ',' + Math.floor(barHeight * 2) + ')';
        canvasCtx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
        posX -= barWidth + .5;
    }
}

Draw()
