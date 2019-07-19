<template lang="html">
<div>
<<<<<<< HEAD
  <navbar></navbar>
  <Home v-if="showHome"  @triggerHomePage="toggleHomePage" ></Home>
  <!-- <signin @triggerSignUp="triggerSignUp" @triggerHomePage="toggleHomePage" v-show="showSignIn"></signin>
  <register @triggerSignIn="toggleSignIn" @triggerHome="toggleHomePage" v-show="showSignUp"></register> -->
=======
  <!-- <navbar></navbar> -->
  <Home :showHome="showHome"></Home>
  <signin @triggerSignUp="triggerSignUp" @triggerHomePage="toggleHomePage" v-show="showSignIn"></signin>
  <register @triggerSignIn="toggleSignIn" @triggerHome="toggleHomePage" v-show="showSignUp"></register>
>>>>>>> 04abec938d7a5a34bcf51b48c6673489ca628738
</div>
</template>

<script>
import navbar from "./navbar"
import Home from "./Home"
// import navbar from './navbar'

export default {

  components : {    
    Home,
    navbar,
  },
  created() {
    this.toggleHomePage()
  },
  data() {
    return {
      message: 'Hello world',
      showSignUp: false,
      showSignIn : false,
      showHome: false
    };
  },
  methods: {
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
  }
};
</script>

<style scoped>
</style>