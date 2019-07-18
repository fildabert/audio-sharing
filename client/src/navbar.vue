<template>
<div>
    <div class="ui fixed menu" style = "background-color:darkturquoise">
    <div class="ui fixed container">
      <a href="#" class="header item">
        <img class="logo" src="">
        Sound
      </a>
      <a href="#" class="item">Home</a>

      <div class="ui simple dropdown item">
        Browse Audio<i class="dropdown icon"></i>
        <div class="menu">
          <a class="item" href="#">Your Audio</a>
          <div class="divider"></div>
          <a class="item" href="#">Browse the Site</a>          
        </div>
      </div>
    </div>
    <div>
        <div class = "item">
        <button v-show = "!loggedIn" class= "ui button item" @click= "signin" href="#" >Sign In</button>
        <button v-show = "!loggedIn" class= "ui button item" @click= "signup" href="#" >Signup</button>
        <button v-show = "loggedIn" class= "ui button item" @click= "signout" href="#" >Logout</button>        
        </div>
    </div>
  </div>
  <sidebar v-show = "loggedIn"></sidebar>
</div>

</template>

<script>

import sidebar from './sidebar'

export default{
    name:"navbar",
    data() {
        return {
        loggedIn : false,
        signinForm: false,
        signupForm: false,
     };
    },
    components:{
        sidebar
    },
    methods:{
        signin(){
            this.signinForm = true
        },
        signup(){
            this.signupForm = true
        },
        signout(){

        }
    },

}
</script>

<style scoped>
</style>