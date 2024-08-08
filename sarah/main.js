//NOTES: testing at http-server


const safeJSONParse = (str, defaultValue) => {         //Makes sure errors aren't thrown with non parsable strings
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

//Global variables and functions and querySelectors
const historyList = []                 //array of history of completed tasks
let displayedTask = getLocalStorage(`currentTask`, 0)         //keeps track of what task is currently being displayed, for previous and next task displays
let currentScreen = `#screen-main`      //keeps track of currentScreen to hide it
let keepTaskID = null

document.querySelector(`#edit-done`).disabled = true //start off with edit-done button disabled

document.querySelector(`#next`).addEventListener("click", () => { //view next task according to taskStack
    displayedTask = (displayedTask + 1) % getLocalStorage(`taskStack`, []).length
    document.querySelector(`#card-title`).innerHTML = getLocalStorage(`taskStack`, [])[displayedTask].title
    document.querySelector(`#card-description`).innerHTML = getLocalStorage(`taskStack`, [])[displayedTask].description
})

document.querySelector(`#previous`).addEventListener("click", () => { //view previous task according to stack array
    displayedTask = (displayedTask - 1 + getLocalStorage(`taskStack`, []).length) % getLocalStorage(`taskStack`, []).length
    document.querySelector(`#card-title`).innerHTML = getLocalStorage(`taskStack`, [])[displayedTask].title
    document.querySelector(`#card-description`).innerHTML = getLocalStorage(`taskStack`, [])[displayedTask].description
})

document.querySelector(`#current`).addEventListener("click", () => { //view current task according to locally saved number
    displayedTask = getLocalStorage(`currentTask`, 0)
    document.querySelector(`#card-title`).innerHTML = getLocalStorage(`taskStack`, [])[displayedTask].title
    document.querySelector(`#card-description`).innerHTML = getLocalStorage(`taskStack`, [])[displayedTask].description
})

document.querySelector(`#check-off`).addEventListener("click", () => {
    setLocalStorage(`currentTask`, (getLocalStorage(`currentTask`, 0) + 1) % getLocalStorage(`taskStack`, []).length)
    displayCurrentTask()
})

const showCorrectScreen = (showMe) => {    
    document.querySelector(currentScreen).classList.add(`hide`)
    document.querySelector(showMe).classList.remove(`hide`)
    currentScreen = showMe
}

const displayCurrentTask = () => {
    
    console.log("displayedTask in displayCurrentTask function = ", displayedTask)

    //Hide previous screen and show displayCurrentTask screen
    showCorrectScreen(`#screen-main`)
    
    console.log("taskStack length = ", getLocalStorage(`taskStack`, []).length)
    if(getLocalStorage(`taskStack`, []).length === 0){
        editTask()
    }
    console.log("getLocalStorage(`taskStack`, [])", getLocalStorage(`taskStack`, []))

    //Display the task with id = currentTask
    document.querySelector(`#card-title`).innerHTML = getLocalStorage(`taskStack`, [])[getLocalStorage(`currentTask`, 0)].title
    document.querySelector(`#card-description`).innerHTML = getLocalStorage(`taskStack`, [])[getLocalStorage(`currentTask`, 0)].description

    /*
    TODO
    flip button should only be selectable when viewing task with id = currentTask
    edit button selectable for all tasks
    when Flip is selected -> send to flipNotes function
    when Trash is selected -> send to deleteTask function
    when Rotation Rectod selected -> send to rotationRecord function
    */
}

//Global event listener to disable/enable editTask done button (have a change event - not on doc, but on input) 
const doneButtonDisable = (doneDisable) => {document.querySelector(`#edit-done`).disabled = doneDisable}

const generateTask = () => {          
    console.log("keepTaskID = ", keepTaskID)
    console.log("displayedTask = ", displayedTask)

    if(keepTaskID){
        getLocalStorage(`taskStack`, [])[displayedTask].title = document.querySelector(`#edit-title`).value
        getLocalStorage(`taskStack`, [])[displayedTask].description = document.querySelector(`#edit-description`).value
    }else{
        //create new task and give it ID  
        const taskStack = getLocalStorage(`taskStack`, [])
        let task = {
            title: document.querySelector(`#edit-title`).value,
            description: document.querySelector(`#edit-description`).value,
            date: new Date(),
            notes: ``,
            id: taskStack.length + 1,  // TODO: I need to use the taskStack with the reduce function to find the largest id and then add 1
        }
        taskStack.push(task)
        setLocalStorage(`taskStack`, taskStack)
    }
    displayCurrentTask()
}

//global eventlistener on edit done button to generate task
document.querySelector(`#edit-done`).addEventListener("click", generateTask)

//global eventlistener on hisory back button to return to display current task
document.querySelector(`#history-back`).addEventListener("click", displayCurrentTask)


const editTask = () => {
    
    console.log("displayedTask entering editTask= ", displayedTask)

    //Hide previous screen and show editTask screen
    showCorrectScreen(`#screen-edit-task`)

    //change event to `#edit-title` input (not on doc) that calls doneButtonDisable with 'false' parameter
    document.querySelector(`#edit-title`).addEventListener("change", (event) => {
        doneButtonDisable(false)
    })
}

//Global eventListener, when + Add New Task selected -> send to editTask
document.querySelector(`#add-new`).addEventListener("click", () => {
    document.querySelector(`#edit-title`).value = ''
    document.querySelector(`#edit-description`).value = ''
    keepTaskID = null
    editTask()
})

//when Edit is selected,send to editTask function with current task info
document.querySelector(`#edit`).addEventListener("click", () => {
    
    console.log("displayedTask=", displayedTask)
    console.log("taskStack[displayedTask] = ", getLocalStorage(`taskStack`, [])[displayedTask])

    document.querySelector(`#edit-title`).value = getLocalStorage(`taskStack`, [])[displayedTask].title
    document.querySelector(`#edit-description`).value = getLocalStorage(`taskStack`, [])[displayedTask].description
    keepTaskID = getLocalStorage(`taskStack`, [])[displayedTask].id
    editTask()
})

//When View History is selected, send to rotationRecord
document.querySelector(`#view-history`).addEventListener("click", () => {
    rotationRecord()
})

const rotationRecord = () => {
    
    //Hide previous screen and show history screen
    showCorrectScreen(`#screen-history`)

    /* TODO
    If task selected -> taskRecord(selected task)
    If Done selected -> return to displayCurrentTask
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