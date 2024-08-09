/*
money in divide with math function
a second subtractive function
make the money displayes into varialbes
the empty button simply makes t-money display 0
the subtractive inputs subtract le number (in the form of a veriable) from u/s money display, and recordes?
history??? but how!? (continued):
make both money and explenation a single string, then add to array? or...
add both to object and add object to array?
or give up!!!!!!!! (definitly this one)
*/

//http-server

/* examples

let currentVal = document.querySelector(`#savings-expense-description`).value   = input

document.querySelector(`#savings-total`).innerHTML                              = output

document.querySelector(`#screen-main`).classList.add(`hide`)
document.querySelector(`#screen-history`).classList.remove(`hide`)              = change page

document.querySelector(`#savings-expense-enter`).addEventListener(`click`, () => {       = button
})
    */

let SavingsNotes 
let StupidNotes

const historyRender = () => {
    document.querySelector(`#screen-main`).classList.add(`hide`)
    document.querySelector(`#screen-history`).classList.remove(`hide`)
    const viewHistory = (
        getLocalStorage('History', [])
            .map((info, idx) => {
                return `
                    <div class="line">
                        <div class="date">
                            ${new Date (info.date).toLocaleDateString()}
                        </div>
                        <div class="account">
                            ${info.account}
                        </div>
                        <div class="amount">
                            ${info.amount}$
                        </div>
                        <div class="description">
                            ${info.description}
                        </div>
                        <button onClick="deleteHistoryLine(${idx})">DELETE</button>
                    </div>
                `
            })
            .join(`\n`)
    )
    document.querySelector('#history-content').innerHTML = viewHistory }

const safeJSONParse = (str, defaultValue) => {
    let value = defaultValue
    try {
        value = JSON.parse(str)
    } catch(err) {}
    return value
}
const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const removeLocalStorage = key => localStorage.removeItem(key)
const getLocalStorage = (key, defaultValue) => {
    const value = safeJSONParse(localStorage.getItem(key), defaultValue)
    return (
    value === null
        ? defaultValue
        : value
    )
}

const deleteHistoryLine = (idx) => {
    let History = getLocalStorage('History', [])
    History.splice(idx,1)
    setLocalStorage('History', History)
    calculations()
    historyRender()
}

const calculations = () => {  
    let Savings = 0
    let Stupid = 0
    let Tithes = 0
    getLocalStorage('History', []).forEach(historyItem => {
        if(historyItem.account === "payday") {
            let PayAmount = historyItem.amount
            let PayAmount1 = PayAmount / 4
            let PayAmount2 = PayAmount / 10
            let PayAmount3 = PayAmount / 100
            PayAmount3 = PayAmount3 * 65
            Savings = Savings + PayAmount3
            Stupid = Stupid + PayAmount1
            Tithes = Tithes + PayAmount2
        } else if(historyItem.account === `savings`) {
            let SavingsSubtract = historyItem.amount*-1
            Savings = Savings - SavingsSubtract
        } else if(historyItem.account === `stupid`) {
            let StupidSubtract = historyItem.amount*-1
            Stupid = Stupid - StupidSubtract
        } else if(historyItem.account === `tithes`) {
            let tithesAmount = historyItem.amount*-1
            Tithes = Tithes - tithesAmount
        }
    })
    document.querySelector(`#stupid-total`).innerHTML = Stupid
    document.querySelector(`#tithe-total`).innerHTML = Tithes
    document.querySelector(`#savings-total`).innerHTML = Savings
    console.log('stupid', Stupid, 'savings', Savings, 'tithes', Tithes)
}
calculations()

document.querySelector(`#savings-expense-enter`).addEventListener(`click`, () => {
    const History = getLocalStorage('History', [])
    const savingsHistoryItem = {
        description: document.querySelector(`#savings-expense-description`).value,
        amount: document.querySelector(`#savings-expense-amount`).value*-1,
        date: Date.now(),
        account: "savings"
    }
    History.push(savingsHistoryItem)
    setLocalStorage('History', History)
    document.querySelector(`#savings-expense-description`).value = ''
    document.querySelector(`#savings-expense-amount`).value = ''
    calculations()
})

document.querySelector(`#pay-enter`).addEventListener(`click`, () => {
    const History = getLocalStorage('History', [])
    const paydayHistoryItem = {
        description: 'payday',
        amount: document.querySelector(`#pay-amount`).value,
        date: Date.now(),
        account: "payday"
    }
    History.push(paydayHistoryItem)
    setLocalStorage('History', History)
    document.querySelector(`#pay-amount`).value = ''
    calculations()
})

document.querySelector(`#stupid-expense-enter`).addEventListener(`click`, () => {
    const History = getLocalStorage('History', [])
    const stupidHistoryItem = {
        description: document.querySelector(`#stupid-expense-description`).value,
        amount: document.querySelector(`#stupid-expense-amount`).value*-1,
        date: Date.now(),
        account: "stupid"
    }
    History.push(stupidHistoryItem)
    setLocalStorage('History', History)
    document.querySelector(`#stupid-expense-description`).value = ''
    document.querySelector(`#stupid-expense-amount`).value = ''
    calculations()
})

document.querySelector(`#tithe-clear`).addEventListener(`click`, () => {
    const History = getLocalStorage('History', [])
    const tithesHistoryItem = {
        amount: document.querySelector(`#tithe-total`).innerHTML*-1,
        date: Date.now(),
        account: "tithes",
        description: "tithed"
    }
    History.push(tithesHistoryItem)
    setLocalStorage('History', History)
    calculations()
})

document.querySelector(`#view-history`).addEventListener(`click`, historyRender)

document.querySelector(`#back`).addEventListener(`click`, () => {
    document.querySelector(`#screen-main`).classList.remove(`hide`)
    document.querySelector(`#screen-history`).classList.add(`hide`)
    calculations()
})

/*
const calculations = () => {
    let Savings = 0
    let Stupid = 0
    let Tithes = 0    
    History.forEach(historyItem => {
        if(historyItem.account === `payday`) {
            console.log(`payday`, historyItem.amount)
        } else if(historyItem.account === `savings`) {
            console.log(`savings`, historyItem.amount)
        } else if(historyItem.account === `stupid`) {
            console.log(`stupid`, historyItem.amount)
        } else if(historyItem.account === `tithes`) {
            console.log(`tithes`, historyItem.amount)
        }
    })
    console.log('Savings', Savings)
}
*/