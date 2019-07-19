<template>
  <div class="ui grid centered">
    <div class="row">
      <h1>Register Form</h1>
    </div>
    <div class="six wide column">
      <div class="ui equal width form">
        <form @submit.prevent="register">
          <div class="fields">
            <div class="field">
              <label>First name</label>
              <input type="text" v-model="firstName" placeholder="First Name" />
            </div>
            <div class="field">
              <label>Last name</label>
              <input type="text" v-model="lastName" placeholder="Last Name" />
            </div>
          </div>
          <div class="fields">
            <div class="field">
              <label>Username</label>
              <input type="text" v-model="username" placeholder="Username" />
            </div>
          </div>
          <div class="fields">
            <div class="field">
              <label>Email</label>
              <input type="text" v-model="email" placeholder="Email" />
            </div>
          </div>
          <div class="fields">
            <div class="field">
              <label>Password</label>
              <input type="password" v-model="password" placeholder="Password" />
            </div>
          </div>
          <div class="row">
            <input type="submit" value="Submit" class="ui blue submit button" />
          </div>
        </form>
        <div class="row">
          <a @click.prevent="triggerSignIn">
            <i class="fas fa-backspace"></i>back
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "register",
  data() {
    return {
      username: null,
      password: null,
      email: null,
      firstName: null,
      lastName: null
    };
  },
  methods: {
    register: function() {
      axios
        .post("http://localhost:3000/users/signup", {
          username: this.username,
          password: this.password,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName
        })
        .then(({data}) => {
          Swal.fire({
            type: "success",
            title: "Register Success",
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem("token", data)
          this.$emit('triggerRegister')
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: err.response.data.err
          });
        });
    },
    triggerSignIn() {
      console.log("masuk");
      this.$emit("triggerSignIn");
    }
  }
};
</script>

<style>
</style>
