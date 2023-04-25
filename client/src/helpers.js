// We are utilizing localStorage here. LocalStorage is a data storage type of web storage. This allows the JavaScript sites and apps to store and access the data without any expiration date. 
// This means that the data will always be persisted and will not expire. So, data stored in the browser will be available even after closing the browser window.


// Fetches any data given a key in the local storage and return.
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};
 
// delete item
export const deleteItem = ({ key }) => {
    return localStorage.removeItem(key)
} 

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

checkStorage;