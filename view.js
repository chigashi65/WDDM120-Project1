import { ExpenseRepository } from './model.js';
import ExpenseController from './controller.js';

class ExpenseView {
    static updateExpenseList() {
        const expenseList = document.getElementById('expenseList');
        expenseList.innerHTML = '';

        ExpenseRepository.getExpenses().forEach((expense, index) => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.innerHTML = `
                <span>${expense.description}</span>
                <span>$${expense.amount.toFixed(2)}</span>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            expenseList.appendChild(expenseItem);
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', ExpenseController.handleDelete);
        });
    }

    static updateBalance() {
        const balance = document.getElementById('balance');
        balance.textContent = ExpenseRepository.calculateBalance().toFixed(2);
    }


    static updatePieChart() {
        const expenses = ExpenseRepository.getExpenses();
        
        // Check if there are no expenses
        if (expenses.length === 0) {
            // Display a default gray pie chart
            const ctx = document.getElementById('pieChart');
            ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height); // Clear the canvas
            ctx.chart = null; // Reset the chart instance
            
            return;
        }

        const labels = expenses.map(expense => expense.description);
        const data = expenses.map(expense => expense.amount);

        const ctx = document.getElementById('pieChart');

        // Check if the canvas has a chart instance
        if (ctx.chart) {
            // Destroy the previous chart instance
            ctx.chart.destroy();
        }

        // Create a new chart instance
        ctx.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)'
                    ],
                }]
            },
        });
    }
}

export default ExpenseView;

