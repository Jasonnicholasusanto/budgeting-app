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

// Update all matching items from local storage
export const updateAllMatchingItems = ({ category, key, value, updatedItems }) => {
    try {
        const items = JSON.parse(localStorage.getItem(category));
    
        const updatedItemsIndex = items.reduce((acc, item, index) => {
            if (item[key] === value) {
            acc.push(index);
            }
            return acc;
        }, []);
    
        updatedItemsIndex.forEach(index => {
            items[index] = updatedItems.find(item => item.id === items[index].id);
        });
    
        localStorage.setItem(category, JSON.stringify(items));
    } catch (e) {
        console.error(e);
        throw new Error("There was a problem updating items.");
    }
}
  
 
// delete item
export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key);

    if (id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }

    return localStorage.removeItem(key);
  };

// Generates random color for the plan's border
const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 55;
    const lightness = 35;
    return `${hue} ${saturation}% ${lightness}%`;
}

// This function calculates the spendings in a budget
export const calculateMoney = (planId) => {
    const transactions = fetchData("transactions") ?? [];
    var incomes = 0;
    var expenses = 0;

    for(var i=0; i< transactions.length; i++){
        if(transactions[i].planId === planId){
            if(transactions[i].transactionType === "Expense"){
                expenses += transactions[i].amount;
            } else if (transactions[i].transactionType === "Income") {
                incomes += transactions[i].amount;
            }
        }
    }

    const total = incomes - expenses;

    return total;
}

// Function to calculate the current balance of a bank account
export const calculateBalance = (balance, assetId) => {
    const transactions = fetchData("transactions") ?? [];
    const today = new Date();
    var incomes = 0;
    var expenses = 0;

    for(var i=0; i< transactions.length; i++){
        if(transactions[i].assetId === assetId){
            if (transactions[i].transactionType === "Expense"){
                expenses += transactions[i].amount;
            } else if (transactions[i].transactionType === "Income") {
                incomes += transactions[i].amount;
            } 
        }
    }

    const total = incomes - expenses;

    return balance + total;

}

// Function to get the number of days between dates
export const getDaysBetweenDates = (dateFrom, dateTo) => {

    if(dateFrom === null || dateTo === null){
        return null;
    }
    
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    const diffDays = Math.round(Math.abs((fromDate - toDate) / oneDay));
    
    return diffDays;
}

export const waitPromise = () => new Promise(res => setTimeout(res, Math.random() * 1500));

// Creating a new user
export const createUser = ({ email, userName, currencyChoice}) => {
    const newUserItem = {
        email: email,
        userName: userName,
        currencyChoice: currencyChoice
    }
      
    const existingUsers = fetchData("users") ?? [];

    // sendUserToZapier({ newUserItem });
    sendEmailToUser({ newUserItem });

    return localStorage.setItem("users", JSON.stringify([...existingUsers, newUserItem]));
}

// This function sends the newly logged in user to Zapier and adds it to the Google Sheet.
export const sendUserToZapier = async ({ newUserItem }) => {

    const webhookUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;

    const payload = {
        email: newUserItem.email,
        username: newUserItem.userName,
        currency: newUserItem.currencyChoice
    };

    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: 'no-cors' 
    })
    .then((response) => {
        console.log("New user signed up successfully!");
    })
    .catch((error) => {
        console.error("Error sending webhook!", error);
    });
};

export const sendEmailToUser = async ({ newUserItem }) => {

    const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_USER_EMAIL_URL;

    const payload = {
        email: newUserItem.email,
        username: newUserItem.userName,
        currency: newUserItem.currencyChoice
    };

    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: 'no-cors' 
    })
    .then((response) => {
        console.log("Email sent to user.");
    })
    .catch((error) => {
        console.error("Error sending webhook!", error);
    });
};

export const sendUserFeedback = async ({ email, name, subject, message }) => {
    const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_USER_FEEDBACK_URL;

    const payload = {
        email: email,
        name: name,
        subject: subject,
        message: message,
    };

    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: 'no-cors' 
    })
    .then((response) => {
        console.log("Feedback sent successfully!");
    })
    .catch((error) => {
        console.error("Error sending feedback!", error);
    });

}


// Create a new Asset plan
export const createAsset = ({ name, assetType, balance, bankName, createdOn, currency, accountNumber, bsbNumber, interestRate}) => {
    
    const newItem = {
        id: crypto.randomUUID(),
        assetType: assetType,
        name: name,
        bankName: bankName,
        createdOn: createdOn,
        balance: +balance,
        color: generateRandomColor(),
        currency: currency,
        accountNumber: accountNumber,
        bsbNumber: bsbNumber,
        interestRate: interestRate
    }

    const existingAssets = fetchData("assets") ?? [];

    return localStorage.setItem("assets",
        JSON.stringify([...existingAssets, newItem]));

}

// Create a new plan
export const createPlan = ({ name, amount, dateFrom, dateTo, planType, currency }) => {
    
    const newItem = {
        id: crypto.randomUUID(),
        planType: planType,
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor(),
        dateFrom: new Date(dateFrom),
        dateTo: new Date(dateTo),
        currency: currency
    }

    const existingPlans = fetchData("plans") ?? [];

    return localStorage.setItem("plans",
        JSON.stringify([...existingPlans, newItem]));
}

// Editing an asset
export const editAsset = ( {id, name, balance, bankName, interestRate, accountNumber, bsbNumber }) => {
    const assets = fetchData("assets");
    const assetIndex = assets.findIndex(asset => asset.id === id);
    
    assets[assetIndex].name = name;
    assets[assetIndex].name = name;
    assets[assetIndex].balance = +balance;
    assets[assetIndex].bankName = bankName;
    assets[assetIndex].interestRate = interestRate;
    assets[assetIndex].accountNumber = accountNumber;
    assets[assetIndex].bsbNumber = bsbNumber;

    // Save the updated "plans" array back to localStorage
    localStorage.setItem("assets", JSON.stringify(assets));
}

// Editing a plan
export const editPlan = ({ id, name, amount, dateFrom, dateTo }) => {

    const plans = fetchData("plans");
    const planIndex = plans.findIndex(plan => plan.id === id);
    
    plans[planIndex].name = name;
    plans[planIndex].amount = +amount;
    plans[planIndex].dateFrom = new Date(dateFrom);
    plans[planIndex].dateTo = new Date(dateTo);

    // Save the updated "plans" array back to localStorage
    localStorage.setItem("plans", JSON.stringify(plans));
}

// Creates new transaction
export const createTransaction = ({
    transactionType, transactionUpcomingType, name, amount, planId, assetId, transactionDate, currency
  }) => {
    const [month, day, year] = transactionDate.split('/').map(Number);
    const dateObject = new Date(year, month - 1, day);
    const today = new Date();
    const epochTime = dateObject.getTime();

    const newItem = {
        id: crypto.randomUUID(),
        transactionType: transactionType,
        transactionUpcomingType: transactionUpcomingType,        
        name: name,
        createdAt: Date.now(),
        transactionDate: epochTime,
        amount: +amount,
        planId: planId,
        assetId: assetId,
        currency: currency
    }

    const existingTransactions = fetchData("transactions") ?? [];

    return localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newItem]));
}

export const editUpcomingPayment = ({ id, type }) => {
    const transactions = fetchData("transactions");
    const transactionIndex = transactions.findIndex(transaction => transaction.id === id);

    transactions[transactionIndex].transactionType = type;
    transactions[transactionIndex].transactionUpcomingType = "nil";

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

export const getUpcomings = (transactions) => {
    const upcomings = (transactions && transactions.length > 0) ? transactions.filter(transaction => transaction.transactionType === 'Upcoming') : [];
    return upcomings;
}

export const getTransactions = (transactions) => {
    const incomesExpenses = (transactions && transactions.length > 0) ? transactions.filter(transaction => (transaction.transactionType === 'Expense' || transaction.transactionType === 'Income')) : [];
    return incomesExpenses;
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
export const formatCurrency = (amount, currency) => {
    return amount.toLocaleString(undefined, {
      style: "currency",
      currency: currency
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