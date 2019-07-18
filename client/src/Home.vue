<template>
    <div style="padding-top: 30px;">
        <div class="ui grid">
            <div class="three wide column">
                <!-- nav -->
            </div>
            <div class="eight wide column"  style="padding-left: 10px;">
                <i class="fas fa-microphone"></i>
                <i class="far fa-stop-circle"></i>
                <Card v-for="list in lists" :key="list.id" :list="list"></Card>
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
            lists:[]
        }
    },
    mounted: function(){
        axios({
            url:'http://localhost:3000/audio',
            method: 'GET'
        })
        .then(({data})=> {
            console.log(data)
            this.lists = data
        })
        .catch((err)=> {
            console.log(err)
        })
    }
}
</script>

<style scoped>

</style>
