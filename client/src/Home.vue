<template>
    <div style="padding-top: 30px;">
        <div class="ui grid">
            <div class="three wide column">
                <sidebar @getAllAudio="getAllAudio" @getUserAudio="getUserAudio"></sidebar>
            </div>
            <div class="eight wide column"  style="padding-left: 10px;">

                <div class="ui grid">
                    <div class="seven wide column">
                        
                    </div>

                    <div class="five wide column">
                <i class="fas fa-microphone" @click="record" style="font-size: 40px;" v-show="!recording && loading === false"></i>
                <i class="far fa-stop-circle" id="stoprecord" style="font-size: 40px;" v-show="recording && loading === false"></i>
                <div class="ui active inline loader" v-show="loading"></div>
                        
                    </div>

                </div>
                
                <Card v-show="page==='home'" v-for="audio in audios" :key="audio._id" :audioLink="audio"></Card>
                <myAudio v-show="page==='myAudio'" :item="item"></myAudio>    
                
            </div>
            <div class="five wide column">
                <!-- iklan -->
            </div>
        </div>
    </div>
</template>

<script>
import Card from './Card.vue'
import sidebar from './sidebar'
import myAudio from './MyAudio'

export default {
    name:'Home',
    components:{
        'Card': Card,
        'sidebar': sidebar,
        'myAudio': myAudio
    },
    props:['showHome'],
    data(){
        return{
            lists:[],
            audios: [],
            recording: false,
            loading: false,
            item: 0,
            page: ""
        }
    },
    mounted: function(){
        this.getAllAudio()
    },
    methods: {
        record: function() {
            this.recording = true
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
                this.recording = false
                this.loading = true
                stream.getTracks()[0].stop()
                const audioBlob = new Blob(audioChunks);
                const audioURL = URL.createObjectURL(audioBlob)
                const audio = new Audio(audioURL);
                
                const formData = new FormData()
                formData.append('audio', audioBlob)
                axios.request({
                    method: "POST",
                    url: "http://localhost:3000/audio/upload",
                    data: formData,
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                .then(response =>{
                    this.loading = false
                    this.audios.unshift(response.data)
                    console.log(response.data.userId)
                })
                .catch(err =>{
                    console.log(err.response)
                })
                });
            });
        },
        getAllAudio(){
            axios({
            url:'http://localhost:3000/audio/all',
            method: 'GET'
            })
            .then(({data})=> {
                console.log(data)
                this.audios = data
                this.page = "home"
            })
            .catch((err)=> {
                console.log(err)
            })
        },
        getUserAudio(){
            this.item ++
            this.page = "myAudio"
        },
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
