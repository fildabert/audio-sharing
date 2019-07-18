<template>
<div style="margin-top :50px; position: fixed" >

<div class="ui vertical menu">
  <div class="item">
    <div class="ui input"><input type="text" placeholder="Search..."></div>
  </div>
  <div class="item">
    <a class = "item">Home</a>
    <div class="menu">
      <a @click="getAllAudio" class="item">Your Audio</a>
      <a class="item">Favourites</a>
    </div>
  </div>
  <a @click="getUserAudio" class="item">
    <i class="grid layout icon"></i> Browse
  </a>
  </div>
</div>
</template>

<script>

export default{
    name:"sidebar",
    data() {
        return {        
        };
    },
    components:{
    },
    methods:{
        getAllAudio(){

        },
        getUserAudio(){

        }
    }

}
</script>

<style scoped>
</style>