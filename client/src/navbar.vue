<template>
<div style = "width :100%">
<div>
    <div class="ui fixed menu">
    <div class="ui fixed container">
      <a href="#" class="header item">
        <img class="logo" src="https://logo.clearbit.com/voice123.com">
            Audio
      </a>
      <a href="#" class="item">Home</a>

      <div class="ui simple dropdown item">
        Browse Audio<i class="dropdown icon"></i>
        <div class="menu">
          <a @click= "getUserAudio" class="item" href="#">Your Audio</a>
          <div class="divider"></div>
          <a @click= "getAllAudio" class="item" href="#">Browse the Site</a>          
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
  <sidebar style = "margin-top:38px" v-show = "loggedIn" ></sidebar>
  
</div>
    <register v-show = "signupForm" style = "margin-top:38px"></register>
    <signin v-show = "signinForm" @loggedIn="loggingIn" @triggerSignUp = "signup" style = "margin-top:38px"></signin>
</div>

</template>

<script>

import sidebar from './sidebar'
import register from './register'
import signin from './signin'

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
        sidebar,
        register,
        signin,
    },
    methods:{
        signin(){
            this.signinForm = true
            this.signupForm = false
        },
        signup(){
            this.signupForm = true 
            this.signinForm = false
        },
        signout(){
            localStorage.removeItem('token')
            this.loggedIn = false
        },
        loggingIn(data){
            this.loggedIn = true
            this.signinForm = false
        },
        getUserAudio(){
            this.$emit('getUserAudio')
        },
        getAllAudio(){
            this.$emit('getAllAudio')
        }
    }

}
</script>

<style scoped>
</style>