<template>
  <div class="container mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Dashboard</h2>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h3 class="text-lg font-semibold">Recent Transactions</h3>
      <ul>
        <li v-for="transaction in transactions" :key="transaction.id">
          {{ transaction.date }} - {{ transaction.amount }}
        </li>
      </ul>
    </div>
    <div>
    <form @submit.prevent="addTransaction">
      <input type="number" v-model="newTransaction.amount" placeholder="Amount">
      <button type="submit">Add Transaction</button>
    </form>
  </div>
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
      newTransaction: {
        amount: null,
        date: new Date().toISOString().slice(0, 10) // current date in YYYY-MM-DD format
      }
    };
  },
  async mounted() {
    await this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/transactions');
        this.transactions = response.data;
      } catch (error) {
        this.error = "Failed to load transactions: " + (error.response?.data?.message || error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async addTransaction() {
      try {
        await axios.post('http://localhost:3000/api/transactions', this.newTransaction);
        this.transactions.push({...this.newTransaction}); // Optionally add the new transaction to the list
        this.newTransaction.amount = null; // Reset the amount after adding
        this.fetchTransactions(); // Optionally re-fetch all transactions
      } catch (error) {
        this.error = "Failed to add transaction: " + (error.response?.data?.message || error.message);
      }
    }
  }
};
</script>

