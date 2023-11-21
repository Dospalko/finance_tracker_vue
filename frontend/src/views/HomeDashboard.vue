<template>
  <div class="container mx-auto p-4" v-if="isAuthenticated">
    <h2 class="text-xl font-bold mb-4">Dashboard</h2>
    <button @click="logout">Logout</button>
    <div v-if="isLoading" class="py-4">Loading...</div>
    <div v-else-if="error" class="py-4 text-red-600">{{ error }}</div>
    <div v-else>
      <h3 class="text-lg font-semibold mb-4">Recent Transactions</h3>
      <ul class="divide-y divide-gray-200">
        <li v-for="transaction in transactions" :key="transaction.id"
          class="py-4 flex justify-between items-center hover:bg-gray-50 transition duration-150 ease-in-out">
          <div>
            <p class="text-sm leading-5 font-medium text-gray-700">{{ transaction.date }} - ${{ transaction.amount }}</p>
          </div>
          <div>
            <button @click="deleteTransaction(transaction.id)" class="text-red-600 hover:text-red-900">Delete</button>
            <button @click="selectTransaction(transaction)" class="ml-4 text-blue-600 hover:text-blue-900">Edit</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="mt-6">
      <form @submit.prevent="addTransaction" class="flex flex-col">
        <input type="number" v-model="newTransaction.amount" placeholder="Amount"
          class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        <button type="submit"
          class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add
          Transaction</button>
      </form>
    </div>
    <div v-if="selectedTransaction" class="mt-6">
      <input type="number" v-model="selectedTransaction.amount"
        class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm">
      <button @click="updateTransaction"
        class="mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save
        Changes</button>
    </div>

  </div>
  <div v-else>
    <p>Please log in to view this page.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transactions: [],
      isLoading: true,
      error: null,
      newTransaction: { amount: null, date: new Date().toISOString().slice(0, 10) },
      selectedTransaction: null
    };
  },
  
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  async mounted() {
    if (this.isAuthenticated) {
      await this.fetchTransactions();
    }
  },
  methods: {
    async fetchTransactions() {
    this.isLoading = true;
    try {
        const response = await axios.get('http://localhost:3000/api/transactions');
        this.transactions = response.data;
    } catch (error) {
        if (error.response.status === 401) {
            this.error = "You're not authorized. Please log in again.";
            localStorage.removeItem('token'); // Clear token
            this.$router.push({ name: 'login' });
        } else {
            this.error = "Failed to load transactions: " + (error.response?.data?.message || error.message);
        }
    } finally {
        this.isLoading = false;
    }
    },
    async addTransaction() {
      try {
        await axios.post('http://localhost:3000/api/transactions', this.newTransaction);
        this.fetchTransactions();
        this.newTransaction.amount = null;
      } catch (error) {
        this.error = "Failed to add transaction: " + (error.response?.data?.message || error.message);
      }
    },
    async deleteTransaction(id) {
      try {
        await axios.delete(`http://localhost:3000/api/transactions/${id}`);
        this.fetchTransactions();
      } catch (error) {
        this.error = "Failed to delete transaction: " + (error.response?.data?.message || error.message);
      }
    },
    selectTransaction(transaction) {
      this.selectedTransaction = { ...transaction };
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'login' });
    },
    async updateTransaction() {
      try {
        await axios.put(`http://localhost:3000/api/transactions/${this.selectedTransaction.id}`, this.selectedTransaction);
        this.fetchTransactions();
        this.selectedTransaction = null;
      } catch (error) {
        this.error = "Failed to update transaction: " + (error.response?.data?.message || error.message);
      }
    } 
  }
};
</script>

<style scoped>/* Add your dashboard-specific styles here */</style>
