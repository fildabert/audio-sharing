<template>
    <div>
        <h1>Hello World</h1>
        <button @click="record">Record</button>
        <button id="stoprecord">Stop Recording</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    methods: {
        record: function() {
            navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();

                var audioChunks = []

                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });
                
                var recordButton = document.getElementById("stoprecord")
                recordButton.addEventListener("click", function() {
                    mediaRecorder.stop()
                })

                mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioURL = URL.createObjectURL(audioBlob)
                const audio = new Audio(audioURL);
                audio.play();
                console.log(audio, "==========================")
                });
            });
        }
    }
}
</script>

<style>

</style>
