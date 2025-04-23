
let audio = document.getElementById("audio")
let startButton = document.getElementById("startButton")

// console.log(startButton)

// user set (not auto)
let on = false

audio.onclick = () => {
    on = !on
}

startButton.onclick = () => {
    on = !on
    if (!on) {
        audio.pause()
        startButton.innerHTML = "Play"
        console.log("User Stop running at ", new Date())
    } else {
        console.log("User Start running at ", new Date())
        startButton.innerHTML = "Stop"
    }
}

// for at least an hour after dawn and for an hour before dusk from early May to late July.
// In Bordeaux in May 2025, the sun will rise around 6:50 and set around 21:10.
// In Bordeaux in June 2025, the sun will rise around 6:16 am and set around 9:52 pm.

let start1 = {H: 6, Min: 40}
let end1 = {H: 8, Min: 10}

let start2 = {H: 19, Min: 40}
let end2 = {H: 21, Min: 20}

let readTime = () => {
    start1 = parseString(document.getElementById("start1").value)
    end1 = parseString(document.getElementById("end1").value)
    start2 = parseString(document.getElementById("start2").value)
    end2 = parseString(document.getElementById("end2").value)
}

const myRe = /(\d\d):(\d\d)/

let parseString = (string) => {
    const match = string.match(myRe)
    // console.log({H: parseInt(match[1]), Min: parseInt(match[2]) })
    if (match) {
        return {
            H: parseInt(match[1]),
            Min: parseInt(match[2])
        }
    }
    return undefined
}

document.getElementById("start1").onchange = readTime
document.getElementById("end1").onchange = readTime
document.getElementById("start2").onchange = readTime
document.getElementById("end2").onchange = readTime

readTime()

// minutesSinceMidnight
let minSM = (h, m) => h * 60 + m

setInterval(() => {
    // console.log("weAreWithinPlayingTime:", weAreWithinPlayingTime())

    if (on) {
        if (weAreWithinPlayingTime()) {
            if (audio.paused) {
                audio.play()
                console.log("Starting playback at ", new Date())
            }
        } else {
            if (!audio.paused) {
                audio.pause()
                console.log("Stopping playback at ", new Date())
            }
        }
    }

}, 3000)

let weAreWithinPlayingTime = () => {
    let now = new Date()
    let x = minSM(now.getHours(), now.getMinutes())

    // console.log(minSM(start1.H, start1.Min), x, minSM(end1.H, end1.Min))

    let first = minSM(start1.H, start1.Min) <= x && x <= minSM(end1.H, end1.Min);
    let second = minSM(start2.H, start2.Min) <= x && x <= minSM(end2.H, end2.Min);
    return first || second
}