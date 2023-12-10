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

console.log('firstResult:', getPart1Result())

