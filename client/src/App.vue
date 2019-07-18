<template>
    <div>
          <Home></Home>
        <!-- <button @click="record">Record</button>
        <button id="stoprecord">Stop Recording</button> -->
        
    </div>
</template>

<script>
import axios from "axios"
import Home from './Home.vue'

export default {
     components:{
        'Home' : Home
    },
    data () {
        return {
            audioLink: ""
        }
    },
    methods: {
        
    }
}
</script>

<style>

</style>

