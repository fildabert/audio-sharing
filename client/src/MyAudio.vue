<template>
    <div v-if="item === 'myAudio'">
        <h1>masuk user</h1>
        <Card v-for="audio in audios" :key="audio._id" :audioLink="audio"></Card>
    </div>
</template>

<script>
import Card from './Card'
export default {
    name:'myAudio',
    props:['item'],
    data(){
        return{
            audios:[]
        }
    },
    mounted(){
        // axios({

        // })
    }
}
</script>
<style scoped>

</style>
