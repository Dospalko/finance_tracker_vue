<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="user.username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
  
<script>
import axios from 'axios'; // Ensure Axios is imported

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      errorMessage: '', // To show error messages to the user
    };
  },
  methods: {
    async loginUser() {
      try {
        // Replace 'this.$http' with 'axios' if you haven't set up an Axios instance
        const response = await axios.post('http://localhost:3000/auth/login', this.user);
        localStorage.setItem('token', response.data.token); // Assuming the token is in response.data.token
        this.$router.push({ name: 'dashboard' });
 // Ensure you have a route named 'dashboard'
      } catch (error) {
        if (error.response) {
          // Handle server-side error (e.g., invalid credentials)
          this.errorMessage = error.response.data.message; // Assuming the error message is in error.response.data.message
        } else if (error.request) {
          // Handle no response (e.g., server is down or CORS error)
          this.errorMessage = 'No response from server. Please try again later.';
        } else {
          // Handle other errors (e.g., network error)
          this.errorMessage = error.message;
        }
        console.error('Error', this.errorMessage); // Log the error message for debugging
      }
    }
  }
};
</script>

  