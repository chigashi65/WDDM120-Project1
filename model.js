export class ExpenseModel {
    constructor(description, amount) {
        this.description = description;
        this.amount = parseFloat(amount);
    }
}

export class ExpenseRepository {
    static expenses = [];

    static addExpense(expense) {
        ExpenseRepository.expenses.push(expense);
    }

    static removeExpense(index) {
        ExpenseRepository.expenses.splice(index, 1);
    }

    static getExpenses() {
        return ExpenseRepository.expenses;
    }

    static calculateBalance() {
        return ExpenseRepository.expenses.reduce((total, expense) => total + expense.amount, 0);
    }
}
