import { readFile } from "../../utils";

const input = readFile('2023', 'day-9', 'input.txt')
const histories = input.split('\n').filter(historyLine => historyLine).map(historyLine => historyLine.split(' ').map(Number))

function isLastDifferenceHistory(history: number[]) {
  return history.every(number => number === 0)
}

function getLastValueOfHistory(history: number[]) {
  const differenceHistory: number[] = []

  for (let i = 1; i < history.length; i++) {
    differenceHistory[i - 1] = history[i] - history[i - 1]
  }

  if (isLastDifferenceHistory(differenceHistory)) {
    return history.at(-1)
  }
  return history.at(-1) + getLastValueOfHistory(differenceHistory)
}

function getPart1Result() {
  return histories.reduce((totalValue: number, history: number[]) => {
    return totalValue + getLastValueOfHistory(history)
  }, 0)
}

console.log('firstResult: ', getPart1Result())

// Part 2

function getFirstValueOfHistory(history: number[]) {
  const differenceHistory: number[] = []

  for (let i = 1; i < history.length; i++) {
    differenceHistory[i - 1] = history[i] - history[i - 1]
  }

  if (isLastDifferenceHistory(differenceHistory)) {
    return history.at(0)
  }
  return history.at(0) - getFirstValueOfHistory(differenceHistory)
}

function getPart2Result() {
  return histories.reduce((totalValue: number, history: number[]) => {
    return totalValue + getFirstValueOfHistory(history)
  }, 0)
}

console.log('secondResult: ', getPart2Result())
