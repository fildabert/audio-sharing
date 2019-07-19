<template lang="html">
  <div class="ui placeholder segment">
  <div class="ui two column very relaxed stackable grid">
    <div class="column">
      <div class="ui form">
        <form @submit.prevent="signIn">
        <div class="field">
          <label>Username</label>
          <div class="ui left icon input">
            <input type="text" v-model="username" placeholder="Username">
            <i class="user icon"></i>
          </div>
        </div>
        <div class="field">
          <label>Password</label>
          <div class="ui left icon input">
            <input type="password" v-model="password">
            <i class="lock icon"></i>
          </div>
        </div>
        <input type="submit" value="Login" class="ui blue submit button"></input>
      </div>
        </form>
    </div>
    <div class="middle aligned column">
      <div class="ui big button" @click="triggerSignUp">
        <i class="signup icon"></i>
        Sign Up
      </div>
    </div>
  </div>
  <div class="ui vertical divider">
    Or
  </div>
</div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "SignIn",
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    signIn: function() {
      axios
        .post("http://localhost:3000/users/signin", {
          username: this.username,
          password: this.password
        })
        .then(function({ data }) {
          Swal.fire({
            type: "success",
            title: "Login Success",
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem("token", data.token);
          this.$$emit("triggerHomePage");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: err.response.data.err
          });
        });
    },
    triggerSignUp: function() {
      this.$emit("triggerSignUp");
    }
  }
};
</script>

<style scoped>
</style>