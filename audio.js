let recorderConfig = {
    audio: {
        sampleRate: 48000,
        channelCount: 2,
        volume: 1.0
    },
    video: false,

}
navigator.webkitGetUserMedia(recorderConfig, (stream) => {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    const audioChunks = [];
    mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
        var blob = new Blob(audioChunks, {
            type: 'audio/x-mpeg-3'
        });
        let audioName = document.title.concat(".mp3");
        // to download the recorded file as mp3
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = audioName
        a.click();
        window.URL.revokeObjectURL(url);
        sendAudioToServer(blob, audioName)
    });
    mediaRecorder.start();

    // recording stop handler
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.msg == "stop-record") {
            mediaRecorder.stop();
            stream.getAudioTracks()[0].stop();
            sendResponse({ response: "record ended" });
            return true;
        }
    })
}, (error) => {
    console.log(error)
});
