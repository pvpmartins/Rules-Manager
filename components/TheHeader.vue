<template>
  <div class="header">
  <label>Rules Manager</label>
    <b-button @click="logout" v-if="isLoggedIn" variant="outline-primary">Logout</b-button>     
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  middleware: "redirect-auth",
  
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.$store.state.auth.accessToken)
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isAuthenticated
    }
  },
  methods: {
    logout() {
     this.$store.commit('auth/clearAccessToken')
     console.log(this.$store)
    this.$router.push('/login')
    }   
  },
})
</script>


<style lang="scss">
 .header {
 color: white;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background-color: blue;
  height: 3rem;
  padding-inline: 2rem;
  button{
    color: white;
  }
  label {
    margin: 0;
    font-weight: bold;
    font-size: 1.3rem;
    white-space: nowrap;
  }
  div {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
 }
  
</style>
