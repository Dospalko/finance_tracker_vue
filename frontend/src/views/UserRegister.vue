<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-xs">
      <h1 class="mb-6 text-3xl text-center text-gray-700">Register</h1>
      <form @submit.prevent="registerUser" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <!-- Username Field -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input type="text" id="username" v-model="newUser.username" required
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <!-- Password Field -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input type="password" id="password" v-model="newUser.password" required
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-xs italic">{{ errorMessage }}</p>

        <!-- Submit Button -->
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
        </div>
      </form>
    </div>
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
      this.errorMessage = '';
      try {
        await this.axios.post('http://localhost:3000/auth/register', this.newUser);
        
        this.$router.push({ name: 'login' });
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            // Handle client-side errors (e.g., validation errors)
            const validationErrors = error.response.data;
            this.errorMessage = validationErrors.join(', '); // Assuming the errors are sent as an array
            this.errorMessage = 'Password is too short. Please choose a longer one.';
         
          } else if (error.response.status === 409) {
            // Handle conflict errors (e.g., username already taken)
            this.errorMessage = 'Username is already taken. Please choose a different one.';
          } else {
            // Handle other server-side errors
            this.errorMessage = error.response.data.message || 'An error occurred during registration.';
          }
        } else if (error.request) {
          this.errorMessage = 'The server did not respond. Please check your connection.';
        } else {
          this.errorMessage = 'An error occurred: ' + error.message;
        }
      }
    }
  }
};
</script>
