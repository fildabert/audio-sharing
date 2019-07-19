<template>
    <div style="padding-top: 30px;">
        <div class="ui grid">
            <div class="three wide column">
                <!-- nav -->
            </div>
            <div class="eight wide column"  style="padding-left: 10px;">
                <i class="fas fa-microphone" @click="record" style="font-size: 20px;"></i>
                <i class="far fa-stop-circle" id="stoprecord" style="font-size: 20px;"></i>
                <Card v-for="audio in audios" :key="audio._id" :audioLink="audio"></Card>

                
            </div>
            <div class="five wide column">
                <!-- iklan -->
            </div>
        </div>
    </div>
</template>

<script>
import Card from './Card.vue'

export default {
    name:'Home',
    components:{
        'Card': Card
    },
    data(){
        return{
            audios: []
        }
    },
    mounted: function(){
        axios({
            url:'http://localhost:3000/audio/all',
            method: 'GET'
        })
        .then(({data})=> {
            console.log(data)
            this.audios = data
        })
        .catch((err)=> {
            console.log(err)
        })
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
                    this.audios.push(response.data)
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

<style scoped>
.fa-microphone:hover{
    cursor: pointer;
    color: blue;
}
.fa-stop-circle:hover{
    cursor: pointer;
    color: red;
}


</style>
