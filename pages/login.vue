<template>
  <div class="login-form">
      <p>Please login to continue.</p>
       <b-form @submit.prevent="login"  >
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      <b-form-input
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group> 
     <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  middleware: "redirect-auth",
  data() {
    return {      
        email: "",
        password: ""      
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('admin/login_json', {
          login: {
            email: this.email,
            password: this.password
          }
        })
        console.log(response)
        const accessToken = response.data.data.result.access_token
        this.$router.push("/")
        this.$store.commit('auth/setAccessToken', accessToken)
        console.log(accessToken)
        // Redirect to home page or other authorized route
      } catch (error) {
        // Handle error
        console.error(error)
      }
    }
  }  
})
</script>

<style  scoped>
 .login-form {
    padding-top: 3rem;
    width: 30%;
    margin-inline: auto;
 } 
</style>
