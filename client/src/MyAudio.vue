<template>
    <div v-if="item">
        <Card v-for="audio in audios" :key="audio._id" :audioLink="audio"></Card>
    </div>
</template>

<script>
import Card from './Card'
export default {
    name:'myAudio',
    props: {
        item: Number
    },
    components:{
        'Card': Card
    },
    data(){
        return{
            audios:[]
        }
    },
    methods: {
        getMyAudio: function() {
        var token = localStorage.getItem("token")
        if(token) {
            axios({
                method: "GET",
                url:`http://localhost:3000/audio/byId`,
                headers: {
                    token: token
                }
            })
            .then(({data})=> {
                console.log(data)
                this.audios = data
            })
            .catch((err)=> {
                console.log(err)
            })
        }
        }
    },
    mounted(){
       this.getMyAudio()
    },
    watch: {
        item: function() {
            this.getMyAudio()
        }
    }
}
</script>
<style scoped>

</style>
