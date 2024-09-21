// Global function

// Get Input value
function getInputValueById(id) {
    return parseFloat(document.getElementById(id).value);
}

// Error handling
function showError(id) {
    document.getElementById(id).classList.remove("hidden");
}

// Convert currency
function formatCurrency(amount) {
    return `${amount.toFixed(2)}`;
}

// History section
function addToHistory(income, totalExpenses, balance) {
    const historyItem = document.createElement("div");
    historyItem.className = 'p-3 bg-white border-l-2 border-indigo-500 rounded-md';

    historyItem.innerHTML = `
        <p class="text-xs text-gray-500">Serial: ${count}</p>
        <p class="text-xs text-gray-500">${new Date().toLocaleDateString()}</p>
        <p class="text-xs text-gray-500">Income: ৳${formatCurrency(income)}</p>
        <p class="text-xs text-gray-500">Expenses: ৳${formatCurrency(totalExpenses)}</p>
        <p class="text-xs text-gray-500">Balance: ৳${formatCurrency(balance)}</p>
    `
    const historyContainer = document.getElementById("history-list");
    historyContainer.insertBefore(historyItem, historyContainer.firstChild);
}


// Global variable
let count = 0;


const calculateButton = document.getElementById("calculate");
calculateButton.addEventListener("click", function () {
    count++;

    const income = getInputValueById("income");
    const software = getInputValueById("software");
    const courses = getInputValueById("courses");
    const internet = getInputValueById("internet");

    if (income <= 0 || isNaN(income)) {
        showError("income-error")
        return;
    }

    const totalExpenses = software + courses + internet;
    const balance = income - totalExpenses;

    if (totalExpenses > income) {
        showError("logic-error")
        return;
    }

    const totalExpensesEl = document.getElementById("total-expenses");
    totalExpensesEl.innerText = totalExpenses.toFixed(2);

    const balanceEl = document.getElementById("balance");
    balanceEl.innerText = balance.toFixed(2);


    const result = document.getElementById("results");
    result.classList.remove("hidden");

    // Add to history
    addToHistory(income, totalExpenses, balance);

    // const historyItem = document.createElement("div");
    // historyItem.className = 'p-3 bg-white border-l-2 border-indigo-500 rounded-md';

    // historyItem.innerHTML = `
    //     <p class="text-xs text-gray-500">Serial: ${count}</p>
    //     <p class="text-xs text-gray-500">${new Date().toLocaleDateString()}</p>
    //     <p class="text-xs text-gray-500">Income: $${income.toFixed(2)}</p>
    //     <p class="text-xs text-gray-500">Expenses: $${totalExpenses.toFixed(2)}</p>
    //     <p class="text-xs text-gray-500">Balance: $${balance.toFixed(2)}</p>
    // `
    // const historyContainer = document.getElementById("history-list");
    // historyContainer.insertBefore(historyItem, historyContainer.firstChild);

})

// Adding Eventlistener for saving button!

const calculateSavingsButton = document.getElementById("calculate-savings");
calculateSavingsButton.addEventListener("click", function () {

    const income = getInputValueById("income");
    const software = getInputValueById("software");
    const courses = getInputValueById("courses");
    const internet = getInputValueById("internet");

    const savingsValue = getInputValueById("savings");


    const totalExpenses = software + courses + internet;
    const balance = income - totalExpenses;

    const savingAmount = (savingsValue * balance) / 100;
    const remainingBalance = balance - savingAmount;

    const savingAmountEl = document.getElementById("savings-amount");
    savingAmountEl.innerText = savingAmount.toFixed(2);

    const remainingBalanceEl = document.getElementById("remaining-balance");
    remainingBalanceEl.innerText = remainingBalance.toFixed(2);
})


// History tab functionality

const assistantTab = document.getElementById("assistant-tab");

const historyTab = document.getElementById("history-tab");
historyTab.addEventListener("click", function () {

    historyTab.classList.add("text-white", "bg-gradient-to-r", "from-blue-500", "to-purple-600");
    historyTab.classList.remove("text-gray-600");

    assistantTab.classList.remove("text-white", "bg-gradient-to-r", "from-blue-500", "to-purple-600");
    assistantTab.classList.add("text-gray-600");

    document.getElementById("expense-form").classList.add("hidden");
    document.getElementById("history-section").classList.remove("hidden");
})

assistantTab.addEventListener("click", function () {

    assistantTab.classList.add("text-white", "bg-gradient-to-r", "from-blue-500", "to-purple-600");
    historyTab.classList.remove("text-white", "bg-gradient-to-r", "from-blue-500", "to-purple-600");
    assistantTab.classList.remove("text-gray-600");
    document.getElementById("expense-form").classList.remove("hidden");
    document.getElementById("history-section").classList.add("hidden");
})


// Live validation

document.getElementById("income").addEventListener("input", function () {
    const inputValue = parseFloat(document.getElementById("income").value);

    if (isNaN(inputValue) || inputValue <= 0) {
        showError("income-error");
        return;
    }
})