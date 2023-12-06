import { readFile } from "../../utils"

interface Race {
  time: number
  distance: number
}

const input = readFile("2023", "day-6", "input.txt")
const [timesString, distancesString] = input.split("\n")
const times = timesString
  .split(": ")[1]
  .split(" ")
  .filter((num) => num)
  .map(Number)
const distances = distancesString
  .split(": ")[1]
  .split(" ")
  .filter((num) => num)
  .map(Number)
const races: Race[] = []

for (let i = 0; i < times.length; i++) {
  races.push({ time: times[i], distance: distances[i] })
}

function getDistance(speed: number, time: number) {
  return (time - speed) * speed
}

function getPossibleSpeedQuantityFromRace(race: Race) {
  const maxSpeed = race.time - 1
  let count = 0

  for (let speed = 1; speed <= maxSpeed; speed++) {
    const distance = getDistance(speed, race.time)
    const lastDistance = getDistance(speed - 1, race.time)
    if (distance < lastDistance) return count * 2 - 1
    if (distance === lastDistance) return count * 2
    if (distance > race.distance) count++
  }
}

function getResultPart1() {
  return races.reduce((acc, race) => {
    return acc * getPossibleSpeedQuantityFromRace(race)
  }, 1)
}

console.log("firstResult: ", getResultPart1())

// Part 2
const longTime = timesString
  .split(": ")[1]
  .split(" ")
  .filter((num) => num)
  .join("")
const longDistance = distancesString
  .split(": ")[1]
  .split(" ")
  .filter((num) => num)
  .join("")
const longRace: Race = { time: Number(longTime), distance: Number(longDistance) }

console.log("secondResult: ", getPossibleSpeedQuantityFromRace(longRace))
