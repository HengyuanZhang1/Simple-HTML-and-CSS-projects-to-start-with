const changeDueDiv = document.getElementById("change-due");
const billInput = document.getElementById("bill");
const cashInput = document.getElementById("cash");
const purchaseButton = document.getElementById("purchase-btn");
const cidDisplay = document.getElementById('cid-display');

let cid = [
    ["PENNY", 0.5], 
    ["NICKEL", 0.5], 
    ["DIME", 3.5], 
    ["QUARTER", 4.25], 
    ["ONE", 30], 
    ["FIVE", 80], 
    ["TEN", 100], 
    ["TWENTY", 320], 
    ["ONE HUNDRED", 500]
]; 

const displayCid = () => {
    const formattedCid = cid.map(denom => `<div>${denom[0]}: $${denom[1].toFixed(2)}</div>`).join("");
    cidDisplay.innerHTML = `<h3>Cash in Drawer:</h3>${formattedCid}`;
};

const checkCashRegister = () => {
    const billValue = Number(billInput.value);
    const cashValue = Number(cashInput.value);
    if (Number(cashValue) < billValue) {
         changeDueDiv.innerHTML = "Customer does not have enough money to purchase the item";
        cashInput.value = "";
        return;
    }

    if (Number(cashInput.value) === bill.value) {
        changeDueDiv.innerHTML = "No change due - customer paid with exact cash";
        cashInput.value = "";
        return;
    }

    let changeDue = cashValue - billValue;
    let totalCID = cid.reduce((sum, elem) => sum + elem[1], 0);
    totalCID = parseFloat(totalCID.toFixed(2));

    if (totalCID === changeDue) {
        let sortedChange = cid.filter(item => item[1] > 0).reverse();
        changeDueDiv.innerHTML = `Status: CLOSED <br />${sortedChange.map(c => `${c[0]}: $${c[1].toFixed(2)}`).join(" ")}`;
        cashInput.value = "";
        return;
    }

    let change = calculateChange(changeDue, cid);

    if (change.status === "INSUFFICIENT_FUNDS") {
        changeDueDiv.innerHTML = "Status: INSUFFICIENT_FUNDS";
    } else if (change.status === "CLOSED") {
        changeDueDiv.innerHTML = `Status: CLOSED <br />${change.change.map(c => `${c[0]}: $${c[1].toFixed(2)}`).join(" ")}`;
    } else {
        changeDueDiv.innerHTML = `Status: ${change.status} <br />${change.change.map(c => `${c[0]}: $${c[1].toFixed(2)}`).join(" ")}`;
    }

    cashInput.value = "";
};

const calculateChange = (changeDue, cid) => {
    const currencyUnit = {
        "ONE HUNDRED": 100,
        "TWENTY": 20,
        "TEN": 10,
        "FIVE": 5,
        "ONE": 1,
        "QUARTER": 0.25,
        "DIME": 0.1,
        "NICKEL": 0.05,
        "PENNY": 0.01
    };

    let totalCID = cid.reduce((sum, elem) => sum + elem[1], 0);
    totalCID = parseFloat(totalCID.toFixed(2));

    if (totalCID < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    let changeArr = [];
    let reversedCid = [...cid].reverse();

    for (let [denom, amount] of reversedCid) {
        let value = currencyUnit[denom];
        let amountOfDenom = 0;

        while (changeDue >= value && amount > 0) {
            amount -= value;
            changeDue -= value;
            changeDue = parseFloat(changeDue.toFixed(2));
            amountOfDenom += value;
        }

        if (amountOfDenom > 0) {
            changeArr.push([denom, amountOfDenom]);
        }
    }

    if (changeDue > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    if (changeArr.reduce((sum, elem) => sum + elem[1], 0) === totalCID) {
        return { status: "CLOSED", change: changeArr };
    }

    return { status: "OPEN", change: changeArr };
};

displayCid();
purchaseButton.addEventListener("click", checkCashRegister);