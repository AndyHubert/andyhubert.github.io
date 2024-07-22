
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

document.querySelector(`#stupid-total`).innerHTML = 0
document.querySelector(`#tithe-total`).innerHTML = 0
document.querySelector(`#savings-total`).innerHTML = 0

document.querySelector(`#savings-expense-enter`).addEventListener(`click`, () => {
    SavingsSubtract = document.querySelector(`#savings-expense-amount`).value
    Savings = Savings - SavingsSubtract
    document.querySelector(`#savings-total`).innerHTML = Savings
    document.querySelector(`#savings-expense-amount`).value = ''
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
})

document.querySelector(`#tithe-clear`).addEventListener(`click`, () => {
    Tithes = 0
    document.querySelector(`#tithe-total`).innerHTML = Tithes
})