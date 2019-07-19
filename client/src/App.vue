<template lang="html">
<div>
  <!-- <navbar></navbar> -->
  <Home :showHome="showHome"></Home>
  <signin @triggerSignUp="triggerSignUp" @triggerHomePage="toggleHomePage" v-show="showSignIn"></signin>
  <register @triggerSignIn="toggleSignIn" @triggerHome="toggleHomePage" v-show="showSignUp"></register>
</div>
</template>

<script>
import signin from "./signin";
import register from "./register"
import Home from "./Home"
// import navbar from './navbar'

export default {
  components : {
    signin,
    register,
    Home,
    // navbar
  },
  created() {
    this.toggleHomePage()
  },
  data() {
    return {
      message: 'Hello world',
      showSignUp: false,
      showSignIn : true,
      showHome: false
    };
  },
  methods: {
    triggerSignUp: function() {
      this.showSignUp = true
      this.showSignIn = false
    },
    toggleHomePage : function () {
      const token = localStorage.getItem("token")
      if(token){
        this.showHome = true
        this.showSignUp = false
        this.showSignIn = false
      } else {
        this.showHome = false
        this.showSignIn = true
      }
    },
    toggleSignIn : function () {
      this.showSignIn = true
      this.showSignUp = false
    }
  }
};
</script>

<style scoped>
</style>