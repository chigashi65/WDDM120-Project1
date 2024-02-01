import { ExpenseModel, ExpenseRepository } from './model.js';
import ExpenseView from './view.js';

class ExpenseController {
      static addExpense() {
            const description = document.getElementById('description').value;
            const amount = document.getElementById('amount').value;

            if (!description || !amount) {
                  alert('Please enter both description and amount.');
                  return;
            }

            const newExpense = new ExpenseModel(description, amount);
            ExpenseRepository.addExpense(newExpense);

            ExpenseView.updateExpenseList();
            ExpenseView.updateBalance();
            ExpenseController.clearForm();
            ExpenseView.updateExpenseList();
            ExpenseView.updateBalance();
            ExpenseView.updatePieChart(); // Update pie chart when adding expense
            ExpenseController.clearForm();
      }

      static handleDelete(event) {
            const index = event.target.dataset.index;
            ExpenseRepository.removeExpense(index);
            ExpenseView.updateExpenseList();
            ExpenseView.updateBalance();
            ExpenseView.updateExpenseList();
            ExpenseView.updateBalance();
            ExpenseView.updatePieChart(); // Update pie chart when deleting expense
        }

      static clearForm() {
            document.getElementById('description').value = '';
            document.getElementById('amount').value = '';
      }
}

export default ExpenseController;
