<template lang="html">
<div>
  <navbar @triggerHomePage="toggleHomePage" @triggerSignOut="toggleHomePage"></navbar>
  <Home v-if="showHome"  @triggerHomePage="toggleHomePage" ></Home>
</div>
</template>

<script>
import navbar from "./navbar"
import Home from "./Home"
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
        console.log("MASUK")
      const token = localStorage.getItem("token")
      if(token){
        this.showHome = true
      } else {
        this.showHome = false
      }
    },
  }
};
</script>

<style scoped>
</style>