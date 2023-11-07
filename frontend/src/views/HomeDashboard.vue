<template>
  <div class="container mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Dashboard</h2>

    <div class="mb-6">
      <h3 class="text-lg font-semibold">Current Balance</h3>
      <!-- Display current balance here -->
    </div>

    <div class="mb-6">
      <h3 class="text-lg font-semibold">Recent Transactions</h3>
      <!-- List of recent transactions will go here -->
    </div>

    <div class="mb-6">
      <h3 class="text-lg font-semibold">Budget Summary</h3>
      <!-- Budget summary or status will go here -->
    </div>

    <div>
      <h3 class="text-lg font-semibold">Financial Overview</h3>
      <!-- Chart or graph for financial data -->
      <div id="financial-chart"></div>
    </div>
  </div>
</template>
<script>

import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

export default {
  data() {
    return {
      transactions: [],
      currentBalance: 0,
      // Add other relevant data structures as needed
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = document.getElementById('financial-chart').getContext('2d');
      new Chart(ctx, {
        type: 'bar', // or 'line', 'doughnut', etc.
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Monthly Expenses',
            data: [500, 400, 300, 700, 200, 400],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>
