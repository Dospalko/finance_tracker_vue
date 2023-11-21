<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-xs">
      <h1 class="mb-6 text-3xl text-center text-gray-700">Login</h1>
      <form @submit.prevent="loginUser" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <!-- Username Field -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input type="text" id="username" v-model="user.username" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <!-- Password Field -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input type="password" id="password" v-model="user.password" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-4">
          <p class="text-red-500 text-xs italic">{{ errorMessage }}</p>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-between">
          <button type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      errorMessage: '',
      isSubmitting: false // To handle button state during submission
    };
  },
  methods: {
    async loginUser() {
      this.errorMessage = '';
      this.isSubmitting = true;
      try {
        // In loginUser method
        const response = await axios.post('http://localhost:3000/auth/login', this.user);
        localStorage.setItem('token', response.data.token);
        this.$router.push({ name: 'dashboard' });

      } catch (error) {
        if (error.response) {
          // Specific error from the server (e.g., invalid credentials)
          this.errorMessage = error.response.data.message || 'Login failed. Please try again.';
        } else if (error.request) {
          // The request was made but no response was received
          this.errorMessage = 'The server did not respond. Please check your connection.';
        } else {
          // Something else happened in setting up the request
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>
