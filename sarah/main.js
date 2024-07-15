setTimeout(
    () => alert('What up, world!'),
    1000*2
)

let task = {
    title: ``,
    description: ``,
    date: ``,
    notes: ``,
    idx: ``,
}

const currentTask = () => {
    /*
    Display the current task
    when Flip is selected -> send to flipNotes function
    when Edit is selected -> send to editTask function
    when Trash is selected -> send to deleteTask function
    when Plus/Add selected -> send to newTask function
    when Rotation Rectod selected -> send to rotationRecord function
    */
}

const flipNotes = () => {
    /*
    (called when a task is done and flipped, to add date and notes to current occurance of task)
    populate current date
    allow input/editing of notes
    when Done is selected -> 
        1)notes are saved to that task's record 
        2)the instance is recorded on the Rotation Record
        3)returns to currentTask function with next task showing
    */
}

const editTask = () => {
    /*
    Display current card data (same format as newTask)
    Allow change of title and description
    (should there be a way to edit previous flip notes?)
    when Done selected ->
        1)titlePresent function
    If titlePresent returns true
        1)save data to task
        2)return to currentTask with updated data
    */
}

const deleteTask = () => {
    /*
    Alert - are you sure you want to delete this task?
    if yes -> 
        1)take task out of rotation, but don't delete data (it still needs to show up with notes in Rotation Record) 
        2)return to currentTask with next task showing
    if no ->return (no action done)
    */
}

const newTask = () => {
    /*
    Display New Card form
    Allow editing of title and description
    when Done selected ->
        1)titlePresent function
    If titlePresent returns true
        1)save data to task
        2)push new task to front of rotation
        (should there be an option where to put task in rotation?)
        2)return to currentTask with with new task showing
    */
}

const rotationRecord = () => {
    /*
    Display Rotation Record
    If task selected -> taskRecord(selected task)
    If date selected -> dateRecord(selected date)
    If Done selected -> return to currentTask
    */
}

const taskRecord = () => {
    /*
    Display history/record of selected task
    if return selected -> return to rotationRecord
    */
}

const dateRecord = () => {
    /*
    Display tasks completed on selected date
    if return selected -> return to rotationRecord
    */
}

const titlePresent = () => {
    /*
    Check if current task has a title (blank spaces don't count)
    if no title ->
        1)alert user no title
        2)return to edit/new task function as though done not selected
    if title -> return true
    */
}