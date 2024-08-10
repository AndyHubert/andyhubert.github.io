setTimeout( 
    () => {
        document.querySelector('#screen-buttons').classList.remove('hide')  
    },
    300  
)
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

const STARTING_SECONDS = 25 //15 * 60 
const WORKOUT_OPTIONS = {
    legs: [
        {
            name: "squat",
            workout: [
              `
     _____
    | ' ' |
    |     |
     -----
       |
-------|-------
       |
       |
      / \\
     /   \\
    /     \\
   /       \\
              `,  
              `
     _____
    | ' ' |
    |     |
     -----
       |
-------|-------
       |
       |
    /     \\
   /       \\
              `,
              `
     _____
    | ' ' |
    |     |
     -----
       |
-------|-------
       |
       |
      / \\
     /   \\
    /     \\
   /       \\
              `,
            ]
    
        },
        {
            name: "lunge",
            workout: [
              `
     _____
    |     |
    |     |
     -----
       |
-------|-------
       |
       |
     |   |
     |   |    
     |   |    
     |   |    `,  
              `
     _____
    |     |
    |     |
     -----
       |
-------|-------
       |
       |
      /  |
     |   |     
    /    |     `,
               `
     _____
    |     |
    |     |
     -----
       |
-------|-------
       |
       |
     |   |
     |   |    
     |   |    
     |   |
              `,
            ]
    
        },
        {
            name: "walking squat",
            workout: [
              `
     _____
    |     |
    |     |
     -----
       |
-------|-------
       |
       |
     |   |
     |   |    
     |   |    
     |   |`, 
              `
     _____
    |     |
    |     |
     -----
       |
-------|-------
       |
       ||
     |  | 
     |  |     
     |       
     |   `,
              `
     _____
    |     |
    |     |
     -----
       |
-------|-------
       |
     | |
     |   |
     |   |    
         |    
         |`,
            ]
    
        },
    ],
    arms: [
        {
            name: "pushup",
            workout: [
              `
      ____
     |    |
      -  - 
     /    \\
    |      |
              `,  
              `
             
      ____
     |    |
    / -  - \\
    \\      /
              `,
              `
      ____
     |    |
      -  - 
     /    \\
    |      |
              `,
            ]
    
        },
        {
            name: "turning plank",
            workout: [
              `
              ____
             |    |
              ---- 
             /    \\
            ---  ---                `, 
        ` ___     /       
         |   |   /      
         |___|  /          
            |   
            ---                  `,
              `
              ____
             |    |
              ---- 
             /    \\
            ---  ---                `,
            ]
    
        },
        {
            name: "cobra pushups",
            workout: [
              `
              ____
             |    |
              ---- 
             /    \\
            |      |
              `,  
              `
              ____
             |    |
              ---- 
             /    \\
            |      |
              `,
              `
              ____
             |    |
              ---- 
             /    \\
            |      |
              `,
            ]
    
        },
    ]
}

let workOutType = undefined
let intervalId = undefined
const returnToHome = () => {
    document.querySelector('#screen-workout').classList.add('hide')
    document.querySelector('#screen-buttons').classList.remove('hide')
    clearInterval(workoutTimer)
}

const setClock = (numSecLeft) => {
    clockTimer = `${Math.floor(numSecLeft / 60)}:${numSecLeft % 60}`
    let seconds = numSecLeft % 60
    if(seconds <= 9){
        clockTimer = `${Math.floor(numSecLeft / 60)}:0${numSecLeft % 60}`
    }
    document.querySelector('#clock').innerHTML = clockTimer
}
const logTime = () => {
    const secondsDone = STARTING_SECONDS - numSecondsLeft
    writeLog = `${Math.floor(secondsDone / 60)}:${secondsDone % 60}`
    let seconds = secondsDone % 60
    if(seconds <= 9){
        writeLog = `${Math.floor(secondsDone / 60)}:0${secondsDone % 60}`
    }
    if(secondsDone === STARTING_SECONDS){
        writeLog = "completed"
    }
    return writeLog
}
let typeOfTrack = undefined
let workoutTimer = undefined
let numSecondsLeft = STARTING_SECONDS

let startWorkoutFunction = (type) => {
    // console.log(type)
    if(type === "arms"){
        typeOfTrack = "arms"
    }
    // console.log(typeOfTrack)
    if(type === "legs"){
        typeOfTrack = "legs"
    }
    if(type === "random"){
        typeOfTrack = "random"  
    }
    console.log(typeOfTrack)
    document.querySelector('#screen-buttons').classList.add('hide')
    document.querySelector('#screen-workout').classList.remove('hide')
    document.querySelector('#stick-figure').innerHTML = `
     _____
    | ' ' |
    |     |
     -----
       |
-------|-------
       |
       |
      / \\
     /   \\
    /     \\
   /       \\

`
    numSecondsLeft = STARTING_SECONDS
    setClock(numSecondsLeft)
    setTimeout(
        () => {
             workoutTimer = setInterval(
                () => {
                    numSecondsLeft--
                    setClock(numSecondsLeft)
                    if(numSecondsLeft === 0) {
                        logMyWorkout()
                        returnToHome()
                        clearInterval(intervalId)  
                    }
                },
                1000 * 1
            )
        },
        100
    )
    setTimeout( 
        () => {
            let keepTrack = 0
            intervalId = setInterval( 
                () => {
                    console.log(typeOfTrack)
                   if(typeOfTrack === "arms"){
                        document.querySelector('#stick-figure').innerHTML = WORKOUT_OPTIONS.arms[0].workout[keepTrack]
                        keepTrack++
                        if(keepTrack === 3){
                        keepTrack = 0
                        }
                   } 
                   if(typeOfTrack === "legs"){
                        document.querySelector('#stick-figure').innerHTML = WORKOUT_OPTIONS.legs[0].workout[keepTrack]
                        keepTrack++
                        if(keepTrack === 3){
                        keepTrack = 0
                        }
                   }
                },
                500
            )
        },
        500   
    ) 
}

const logMyWorkout = () => {
    let logHistory = getLocalStorage('logHistory',[])
    const workoutLoging = {
        date: Date.now(),
        nameOfWorkout: workOutType,
        howFarLeft: logTime(),
    }
    logHistory.push(workoutLoging)
    setLocalStorage(`logHistory`, logHistory) 
}



document.querySelector('#do-legs').addEventListener('click', 
    () => {
        workOutType = "legs"
        startWorkoutFunction("legs")
    }
)
document.querySelector('#do-arms').addEventListener('click', 
    () => {
        workOutType = "arms"
        startWorkoutFunction("arms")
    }
)
document.querySelector('#do-random').addEventListener('click', 
    () => {
        workOutType = "random"
        let choices = ["arms", "legs"]
        startWorkoutFunction(choices[randomness = parseInt(Math.random() * 2)])
    }
)
document.querySelector('#cancel').addEventListener('click', 
    () => {
        console.log('haalloo')
        returnToHome()
        logMyWorkout()
        clearInterval(intervalId)
    }
)
document.querySelector('#view-log').addEventListener('click', 
    () => {

        const theHistory = (
            getLocalStorage('logHistory',[])

                .map((aSpecificWorkout) => {
                    return `
                        <div>
                            ${new Date(aSpecificWorkout.date).toLocaleDateString()}, ${aSpecificWorkout.nameOfWorkout}, ${aSpecificWorkout.howFarLeft}
                        </div>
                    `
                })
                .join(``)
        )
        document.querySelector('#log-details').innerHTML = theHistory
        document.querySelector('#screen-buttons').classList.add('hide')
        document.querySelector('#screen-log').classList.remove('hide')
    }
)
document.querySelector('#back').addEventListener('click', 
    () => {
        document.querySelector('#screen-log').classList.add('hide')
        document.querySelector('#screen-buttons').classList.remove('hide')
    }
)

document.querySelector('#stick-figure').innerHTML = `
     _____
    | ' ' |
    |     |
     -----
       |
-------|-------
       |
       |
      / \\
     /   \\
    /     \\
   /       \\

`

        
    



// Things my program needs to do:
// if buttin is pushed start the workout chosen
//      go to other screen
//      say "ready, set, go"
//      start an interval for every second to count down from 15 on the screan
//      say the next move
//          figure number 1 says in bubble the next move 
//              start out with strech for 1 min
//                  three part streach
//              pick out a random leg, or arm, or both move
//              start a timer for 4 min
// move the stick figure
//      the move that was randomly picked starts and the first man comes up
//      then the second man in that move doing the next fase of that move comes in and so on, and over again
//      when the two min is done a timer starts for fifteen seconds
//      stick man says break
//      repeat 1 more time then go to next random move
//      at the end there is a 30 second streach then go back to homescrean (same three part streach)
// go back to home screen if canceled
// log workouts completed and not completed
//      if you complete a workout, it puts the date, the name of the workout (legs, arms, or random), and "completed" in a bar
//      if not, it does the same exept "not completed, boo on you" 
//      push "back" to go back to home screen   