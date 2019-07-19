<template>
<div style=" position: fixed" >

<div class="ui vertical menu">
  <!-- <div class="item">
    <div class="ui input"><input v-model="searchValue" v-on:keyup= "search(searchValue)" type="text" placeholder="Search..."></div>
  </div> -->
  <div class="item">
    <div class="menu">
      <a @click="getAllAudio" class="item">All Audio</a>
      <a class="item">Favourites</a>
    </div>
  </div>
  <a @click="getUserAudio" class="item">
    <i class="grid layout icon"></i> Your Audio
  </a>
  </div>
</div>
</template>

<script>

export default{
    name:"sidebar",
    data() {
        return {
            searchValue : ""       
        };
    },
    components:{
    },
    methods:{
        getAllAudio(){
            this.$emit('getAllAudio')
        },
        getUserAudio(){
          console.log('masuk ')
            this.$emit('getUserAudio')
        },
        search(value){
            this.$emit('search', value)
        }
    }

}
</script>

<style scoped>
</style>