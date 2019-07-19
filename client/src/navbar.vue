<template>
  <div style="width :100%; margin-bottom: 40px;">
    <div>
      <div class="ui fixed menu">
        <div class="ui fixed container">
          <a href="#" class="header item">
            <img class="logo" src="https://logo.clearbit.com/voice123.com" />
            Audio
          </a>
        </div>
        <div>
          <div class="item">
            <button v-show="!loggedIn" class="ui button item" @click="signin" href="#">Sign In</button>
            <button v-show="!loggedIn" class="ui button item" @click="signup" href="#">Signup</button>
            <button v-show="loggedIn" class="ui button item" @click="signout" href="#">Logout</button>
          </div>
        </div>
      </div>
      <!-- <sidebar @search="search" style="margin-top:50px" v-show="loggedIn"></sidebar> -->
    </div>
    <register v-show="signupForm" @triggerSignIn="signin" @triggerRegister="triggerHomePage" style="margin-top:50px"></register>
    <signin
      v-show="signinForm"
      @loggedIn="loggingIn"
      @triggerSignUp="signup"
      @triggerHomePage="triggerHomePage"
      style="margin-top:50px"
    ></signin>
  </div>
</template>

<script>
import sidebar from "./sidebar";
import register from "./register";
import signin from "./signin";

export default {
  name: "navbar",
  created() {
      this.toggleHomePage()
  },
  data() {
    return {
      loggedIn: false,
      signinForm: true,
      signupForm: false,
      search: ""
    };
  },
  components: {
    sidebar,
    register,
    signin
  },
  methods: {
     toggleHomePage : function () {
      const token = localStorage.getItem("token")
      if(token){
        console.log(token, "ASDASD")
        this.signinForm = false
        this.signupForm = false
        this.loggedIn = true
      } else {
        this.signinForm = true
        this.signupForm = false
      }
    },
    triggerHomePage() {
      this.$emit("triggerHomePage");
      this.signinForm = false
      this.signupForm = false
      this.loggedIn = true
    },
    signin() {
      this.signinForm = true;
      this.signupForm = false;
    },
    signup() {
      this.signupForm = true;
      this.signinForm = false;
    },
    signout() {
      localStorage.removeItem("token")
      this.$emit("triggerSignOut")
      this.loggedIn = false;
      this.signinForm = true
    },
    loggingIn(data) {
      this.loggedIn = true;
      this.signinForm = false;
    },
    getUserAudio() {
      this.$emit("getUserAudio");
    },
    getAllAudio() {
      this.$emit("getAllAudio");
    }
  }
};
</script>

<style scoped>
</style>