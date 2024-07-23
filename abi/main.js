
let startWorkoutFunction = () => {
    document.querySelector('#screen-buttons').classList.add('hide')
    document.querySelector('#screen-workout').classList.remove('hide')  
}

document.querySelector('#do-legs').addEventListener('click', 
    () => {
        startWorkoutFunction()
    }
)
document.querySelector('#do-arms').addEventListener('click', 
    () => {
        startWorkoutFunction()
    }
)
document.querySelector('#do-random').addEventListener('click', 
    () => {
        startWorkoutFunction()
    }
)
document.querySelector('#cancel').addEventListener('click', 
    () => {
        document.querySelector('#screen-workout').classList.add('hide')
        document.querySelector('#screen-buttons').classList.remove('hide')
    }
)
document.querySelector('#view-log').addEventListener('click', 
    () => {
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

// document.querySelector('#stick-figure').innerHTML = ""

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