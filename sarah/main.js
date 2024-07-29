//NOTES: testing at http-server

//Global variables and functions
const taskStack = []                   //array of active tasks
const historyList = []                 //array of history of completed tasks
let currentTask = 1                     //this will always be holding the id of the current task
let currentScreen = `#screen-main`      //keeps track of currentScreen to hide it
document.querySelector(`#edit-done`).disabled = true //start off with edit-done button disabled

const showCorrectScreen = (showMe) => {
    console.log("currentScreen before", currentScreen)
    
    document.querySelector(currentScreen).classList.add(`hide`)
    document.querySelector(showMe).classList.remove(`hide`)
    currentScreen = showMe
   
    console.log("currentScreen after", currentScreen)
}

const displayCurrentTask = () => {
    
    //Hide previous screen and show displayCurrentTask screen
    showCorrectScreen(`#screen-main`)
    
    console.log("taskStack = ", taskStack.length)
    if(taskStack.length === 0){
        editTask()
    }
    console.log("task created: task", taskStack)
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

//Global event listener to disable/enable editTask done button (have a change event - not on doc, but on input) 
const doneButtonDisable = (doneDisable) => {document.querySelector(`#edit-done`).disabled = doneDisable}

const generateTask = () => {          
    console.log("into generateTask")
    //create new task and give it ID  
    let task = {
        title: document.querySelector(`#edit-title`).value,
        description: document.querySelector(`#edit-description`).value,
        date: new Date(),
        notes: ``,
        id: currentTask,
    }
    console.log("task =", task)
    taskStack.push(task)
    currentTask++
    console.log("Current Task after task creation and increment -", currentTask)
    displayCurrentTask()
}

//global eventlistener on done button to generate task
document.querySelector(`#edit-done`).addEventListener("click", generateTask)


const editTask = () => {
    console.log("Current Task on entering editTask -", currentTask)
    
    //Hide previous screen and show editTask screen
    showCorrectScreen(`#screen-edit-task`)

    //change event to `#edit-title` input (not on doc) that calls doneButtonDisable with 'false' parameter
    document.querySelector(`#edit-title`).addEventListener("change", (event) => {
        doneButtonDisable(false)
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