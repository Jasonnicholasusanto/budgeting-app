// We are utilizing localStorage here. LocalStorage is a data storage type of web storage. This allows the JavaScript sites and apps to store and access the data without any expiration date. 
// This means that the data will always be persisted and will not expire. So, data stored in the browser will be available even after closing the browser window.


// Fetches any data given a key in the local storage and return.
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value);
  };
 
// delete item
export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key);

    if (id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }

    return localStorage.removeItem(key);
  };

// Generates random color for the budget's border
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 36} 65% 50%`
}

export const waitPromise = () => new Promise(res => setTimeout(res, Math.random() * 1500));

// create a new budget
export const createBudget = ({ name, amount, dateFrom, dateTo }) => {
    
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor(),
        dateFrom: new Date(dateFrom),
        dateTo: new Date(dateTo)
    }

    const existingBudgets = fetchData("budgets") ?? [];

    return localStorage.setItem("budgets",
        JSON.stringify([...existingBudgets, newItem]));
}

// Creates new transaction
export const createTransaction = ({
    transactionType, recurring, name, amount, budgetId, transactionDate
  }) => {
    const [month, day, year] = transactionDate.split('/').map(Number);
    const dateObject = new Date(year, month - 1, day);
    const epochTime = dateObject.getTime();

    const newItem = {
        id: crypto.randomUUID(),
        transactionType: transactionType,
        recurring: recurring,
        name: name,
        createdAt: Date.now(),
        transactionDate: epochTime,
        amount: +amount,
        budgetId: budgetId
    }

    const existingTransactions = fetchData("transactions") ?? [];

    return localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newItem]));

}

// total spent by budget
// export const calculateSpentByBudget = (budgetId) => {
//     const expenses = fetchData("expenses") ?? [];
//     const transactions = fetchData("incomes") ?? [];

//     const budgetSpent = expenses.reduce((exp, expense) => {
//       // check if expense.id === budgetId I passed in
//       if (expense.budgetId !== budgetId) return exp
  
//       // add the current amount to my total
//       return exp += expense.amount;
//     }, 0);

//     const incomeReceived = transactions.reduce((inc, income) => {

//         if (income.budgetId !== budgetId) return inc

//         return inc += income.amount;
//     }, 0);

//     const total = incomeReceived - budgetSpent;
    
//     return total;
// }

export const calculateBudget = (budgetId) => {
    const transactions = fetchData("transactions") ?? [];
    var incomes = 0;
    var expenses = 0;

    for(var i=0; i< transactions.length; i++){
        if(transactions[i].budgetId === budgetId){
            if(transactions[i].transactionType === "Expense"){
                expenses += transactions[i].amount;
            } else {
                incomes += transactions[i].amount;
            }
        }
    }

    const total = incomes - expenses;

    return total;
}


/* FORMATTING FUNCTIONS */

// Formating percentages
export const formatPercentage = (amount) => {
    return amount.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 0,
    })
}
  
  // Format currency
export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined, {
      style: "currency",
      currency: "AUD"
    })
}

// Format date
export const formatDateToLocaleString = (dateObj) => new Date(dateObj).toLocaleDateString();

// Function to check localStorage 
export const checkStorage = () => {
    var _lsTotal = 0,
        _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
        console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
    };
    console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
}