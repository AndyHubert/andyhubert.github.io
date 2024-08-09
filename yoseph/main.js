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

let savingsNotes 
let stupidNotes

const historyRender = () => {
    document.querySelector(`#screen-main`).classList.add(`hide`)
    document.querySelector(`#screen-history`).classList.remove(`hide`)
    const viewHistory = (
        getLocalStorage('history', [])
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
                            ${info.amount.toFixed(2)}$
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
    let history = getLocalStorage('history', [])
    history.splice(idx,1)
    setLocalStorage('history', history)
    calculations()
    historyRender()
}

const calculations = () => {  
    let savings = 0
    let stupid = 0
    let tithes = 0
    getLocalStorage('history', []).forEach(historyItem => {
        if(historyItem.account === "payday") {
            let PayAmount = historyItem.amount
            let PayAmount1 = PayAmount / 4
            let PayAmount2 = PayAmount / 10
            let PayAmount3 = PayAmount / 100
            PayAmount3 = PayAmount3 * 65
            savings = savings + PayAmount3
            stupid = stupid + PayAmount1
            tithes = tithes + PayAmount2
        } else if(historyItem.account === `savings`) {
            let SavingsSubtract = historyItem.amount*-1
            savings = savings - SavingsSubtract
        } else if(historyItem.account === `stupid`) {
            let StupidSubtract = historyItem.amount*-1
            stupid = stupid - StupidSubtract
        } else if(historyItem.account === `tithes`) {
            let tithesAmount = historyItem.amount*-1
            tithes = tithes - tithesAmount
        }
    })
    document.querySelector(`#stupid-total`).innerHTML = stupid.toFixed(2)
    document.querySelector(`#tithe-total`).innerHTML = tithes.toFixed(2)
    document.querySelector(`#savings-total`).innerHTML = savings.toFixed(2)
}
calculations()

document.querySelector(`#savings-expense-enter`).addEventListener(`click`, () => {
    const amount = document.querySelector(`#savings-expense-amount`).value
    if(!/^[0-9.]+$/.test(amount)) return
    const history = getLocalStorage('history', [])
    const savingsHistoryItem = {
        description: document.querySelector(`#savings-expense-description`).value,
        amount: amount*-1,
        date: Date.now(),
        account: "savings"
    }
    history.push(savingsHistoryItem)
    setLocalStorage('history', history)
    document.querySelector(`#savings-expense-description`).value = ''
    document.querySelector(`#savings-expense-amount`).value = ''
    calculations()
})

document.querySelector(`#pay-enter`).addEventListener(`click`, () => {
    const amount = document.querySelector(`#pay-amount`).value
    if(!/^[0-9.]+$/.test(amount)) return
    const history = getLocalStorage('history', [])
    const paydayHistoryItem = {
        description: 'payday',
        amount: Number(amount),
        date: Date.now(),
        account: "payday"
    }
    history.push(paydayHistoryItem)
    setLocalStorage('history', history)
    document.querySelector(`#pay-amount`).value = ''
    calculations()
})

document.querySelector(`#stupid-expense-enter`).addEventListener(`click`, () => {
    const amount = document.querySelector(`#stupid-expense-amount`).value
    if(!/^[0-9.]+$/.test(amount)) return
    const history = getLocalStorage('history', [])
    const stupidHistoryItem = {
        description: document.querySelector(`#stupid-expense-description`).value,
        amount: amount*-1,
        date: Date.now(),
        account: "stupid"
    }
    history.push(stupidHistoryItem)
    setLocalStorage('history', history)
    document.querySelector(`#stupid-expense-description`).value = ''
    document.querySelector(`#stupid-expense-amount`).value = ''
    calculations()
})

document.querySelector(`#tithe-clear`).addEventListener(`click`, () => {
    const history = getLocalStorage('history', [])
    const tithesHistoryItem = {
        amount: document.querySelector(`#tithe-total`).innerHTML*-1,
        date: Date.now(),
        account: "tithes",
        description: "tithed"
    }
    history.push(tithesHistoryItem)
    setLocalStorage('history', history)
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
    let savings = 0
    let stupid = 0
    let tithes = 0    
    history.forEach(historyItem => {
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
    console.log('savings', savings)
}
*/