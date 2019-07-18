<template>
    <div>
        <h1>Hello World</h1>
        <button @click="record">Record</button>
        <button id="stoprecord">Stop Recording</button>
        <audio controls v-if="audioLink">
        <source :src="audioLink" />
        </audio>
    </div>
</template>

<script>

// axios.request({
//                     method: "POST",
//                     url: "http://localhost:3000/audio/upload",
//                     data: {
//                         blob: formData
//                     }
//                 })
import axios from "axios"

export default {
    data () {
        return {
            audioLink: ""
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
                
                const formData = new FormData()
                formData.append('audio', audioBlob)
                console.log(formData)
                axios.post(`http://localhost:3000/audio/upload`, formData)
                .then(response =>{
                    this.audioLink = response.data
                    console.log(response.data)
                })
                .catch(err =>{
                    console.log(err.response)
                })
                });
            });
        }
    }
}
</script>

<style>

</style>


