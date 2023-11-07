<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-xs">
      <h1 class="mb-6 text-3xl text-center text-gray-700">Login</h1>
      <form @submit.prevent="loginUser" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input type="text" id="username" v-model="user.username" required
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input type="password" id="password" v-model="user.password" required
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </div>
      </form>
    </div>
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

  