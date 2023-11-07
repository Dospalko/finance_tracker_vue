<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="newUser.username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="newUser.password" required>
      </div>
      <button type="submit">Register</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        username: '',
        password: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        await this.axios.post('http://localhost:3000/auth/register', this.newUser);
        // Handle the response here
        this.$router.push({ name: 'login' }); // Redirection after successful registration
      } catch (error) {
        // If there is an error, handle it here
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.errorMessage = error.response.data.message || 'An error occurred during registration.';
        } else if (error.request) {
          // The request was made but no response was received
          this.errorMessage = 'The server did not respond.';
        } else {
          // Something happened in setting up the request that triggered an Error
          this.errorMessage = 'An error occurred: ' + error.message;
        }
      }
    }
  }
};
</script>
