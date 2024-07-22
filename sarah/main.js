//NOTES: testing at http-server

//Global variables
const taskStack = []                   //array of active tasks
const historyList = []                 //array of history of completed tasks
let currentTask                     //this will always be holding the id of the current task

const displayCurrentTask = () => {
    console.log("taskStack = ", taskStack.length)
    if(taskStack.length === 0){
        editTask()
    }
    /*
    Display the task with id = currentTask
    when back arrow selected -> view previous task according to stack array
    when forward arrow selected -> view next task according to stack array
    flip button should only be selectable when viewing task with id = currentTask
    edit button selectable for all tasks
    when Flip is selected -> send to flipNotes function
    when Edit is selected -> send to editTask function
    when Trash is selected -> send to deleteTask function
    when Plus/Add selected -> send to editTask function
    when Rotation Rectod selected -> send to rotationRecord function
    */
}

const editTask = () => {
    let titleText = ""
    let descriptionText = ""
    document.querySelector(`#screen-main`).classList.add(`hide`)
    document.querySelector(`#screen-edit-task`).classList.remove(`hide`)  //display edit form
    console.log(document.querySelector(`#edit-title`).input)
    if(document.querySelector(`#edit-title`).input === undefined){
        document.querySelector(`#edit-done`).disabled = true  //disable DONE button if no title
    }
    document.addEventListener(`click`, (titleText, descriptionText ) => {
        titleText = document.querySelector(`#edit-title`).value
        if(titleText !== ""){
            document.querySelector(`#edit-done`).disabled = false  //enable DONE button once Title input
        }
        descriptionText = document.querySelector(`#edit-description`).value
        console.log("Title:", titleText)
        console.log("Description:", descriptionText)
    })

        /*
        if new task, all fields should be empty
            create new task object
        if editing task, fields should have data from id = whatever the id of the task was where edit was clicked
        Allow to edit title
        unhide done button as soon as title filled in
        Allow to edit description
        when Done selected ->
            1)save data to task
            2)if new, push new task to front of rotation...or give it an id that will put it where you want it???
                return to displayCurrentTask with currentTask id = either new task or previous current task
            3) if editing a task, return to displayCurrentTask viewing the task edited (whether it's the current task or not)
        */
}

displayCurrentTask()

// let task = {
//     title: ``,
//     description: ``,
//     date: ``,
//     notes: ``,
//     id: ``,
// }


const flipNotes = () => {
    /*
    (called when a task is done and flipped, to add date and notes to current occurance of task)
    populate current date
    allow input/editing of notes
    when Done is selected -> 
        1)notes are saved to that task's record 
        2)the instance is recorded on the Rotation Record
        3)returns to displayCurrentTask function with next task showing
    */
}

const deleteTask = () => {
    /*
    if(confirm(`Are you sure`)) {
        // do it
    }
    Alert - are you sure you want to delete this task?
    if yes -> 
        1)take task out of rotation, but don't delete data (it still needs to show up with notes in Rotation Record) 
        2)return to displayCurrentTask with next task showing
    if no ->return (no action done)
    */
}

const rotationRecord = () => {
    /*
    Display Rotation Record
    If task selected -> taskRecord(selected task)
    If Done selected -> return to displayCurrentTask
    */
}

const taskRecord = () => {
    /*
    Display history/record of selected task
    if return selected -> return to rotationRecord
    */
}


// document.querySelector(`#screen-main`).classList.add(`hide`)
// document.querySelector(`#screen-edit-task`).classList.remove(`hide`)
// for inputs: .value
// .addEventListener(`click`, () => {
// })

// document.querySelector(`#view-history`).disabled = true

// localStorage