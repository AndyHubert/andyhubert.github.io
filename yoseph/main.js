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

let Savings = 0
let Stupid = 0
let Tithes = 0
let SavingsNotes
let StupidNotes
let SavingsSubtract
let StupidSubtract
let PayAmount1
let History = []

document.querySelector(`#stupid-total`).innerHTML = 0
document.querySelector(`#tithe-total`).innerHTML = 0
document.querySelector(`#savings-total`).innerHTML = 0

document.querySelector(`#savings-expense-enter`).addEventListener(`click`, () => {
    SavingsSubtract = document.querySelector(`#savings-expense-amount`).value
    Savings = Savings - SavingsSubtract
    document.querySelector(`#savings-total`).innerHTML = Savings
    document.querySelector(`#savings-expense-amount`).value = ''
    const savingsHistoryItem = {
        description: document.querySelector(`#savings-expense-description`).value,
        amount: SavingsSubtract,
        date: Date.now(),  // new Date(item.date)
        account: "savings"
    }
    History.push(savingsHistoryItem)
    document.querySelector(`#savings-expense-description`).value = ''
})

document.querySelector(`#pay-enter`).addEventListener(`click`, () => {
    PayAmount = document.querySelector(`#pay-amount`).value
    PayAmount = Number(PayAmount)
    let PayAmount1 = PayAmount / 4
    let PayAmount2 = PayAmount / 10
    let PayAmount3 = PayAmount / 100
    PayAmount3 = PayAmount3 * 65
    Savings = Savings + PayAmount3
    Stupid = Stupid + PayAmount1
    Tithes = Tithes + PayAmount2
    document.querySelector(`#stupid-total`).innerHTML = Stupid
    document.querySelector(`#tithe-total`).innerHTML = Tithes
    document.querySelector(`#savings-total`).innerHTML = Savings
    document.querySelector(`#pay-amount`).value = ''
})

document.querySelector(`#stupid-expense-enter`).addEventListener(`click`, () => {
    StupidSubtract = document.querySelector(`#stupid-expense-amount`).value
    Stupid = Stupid - StupidSubtract
    document.querySelector(`#stupid-total`).innerHTML = Stupid
    document.querySelector(`#stupid-expense-amount`).value = ''
    const stupidHistoryItem = {
        description: document.querySelector(`#stupid-expense-description`).value,
        amount: StupidSubtract,
        date: Date.now(),
        account: "stupid"
    }
    History.push(stupidHistoryItem)
    document.querySelector(`#stupid-expense-description`).value = ''
})

document.querySelector(`#tithe-clear`).addEventListener(`click`, () => {
    Tithes = 0
    document.querySelector(`#tithe-total`).innerHTML = Tithes
})

document.querySelector(`#view-history`).addEventListener(`click`, () => {
    document.querySelector(`#screen-main`).classList.add(`hide`)
    document.querySelector(`#screen-history`).classList.remove(`hide`)
    const viewHistory = (
        History
            .map((info) => {
                return `
                    <div>
                        ${info.date} ${info.account} ${info.amount}$ ${info.description}
                    </div>
                `
            })
            .join(`\n`)
    )
    document.querySelector('#history-content').innerHTML = viewHistory })

document.querySelector(`#back`).addEventListener(`click`, () => {
    document.querySelector(`#screen-main`).classList.remove(`hide`)
    document.querySelector(`#screen-history`).classList.add(`hide`)
})