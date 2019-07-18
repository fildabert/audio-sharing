<template lang="html">
<div>
  <h1>{{ message }}</h1>
  <signin @triggerSignUp="triggerSignUp" v-show="showSignIn"></signin>
  <register v-show="showSignUp"></register>
</div>
</template>

<script>
import signin from "./signin";
import register from "./register"
export default {
  components : {
    signin,
    register
  },
  data() {
    return {
      message: 'Hello world',
      showSignUp: false,
      showSignIn : true,
    };
  },
  methods: {
    triggerSignUp: function() {
      this.showSignUp = true
      this.showSignIn = false
    }
  }
};
</script>

<style scoped>
</style>