import { readFile } from "../../utils"

interface Card {
  winningNumbers: string[]
  numbers: string[]
}

const input = readFile("2023", "day-4", "input.txt")
const cards = input.split("\n")

function cardStringToCard(text: string): Card {
  const [winningNumbers, numbers] = text
    .split(": ")[1]
    .split(" | ")
    .map((numbers) => numbers.split(" "))

  return {
    winningNumbers: winningNumbers.filter((number) => number),
    numbers: numbers.filter((number) => number)
  }
}

function getPointFromCard(card: Card) {
  const count =
    card.winningNumbers.reduce((matchCount, number) => {
      if (card.numbers.includes(number)) {
        matchCount += 1
      }
      return matchCount
    }, 0) - 1

  if (count < 0) return 0
  return Math.pow(2, count)
}

function getResultPart1() {
  return cards.reduce((total, cardString) => {
    const card = cardStringToCard(cardString)
    return total + getPointFromCard(card)
  }, 0)
}

console.log("firstResult: ", getResultPart1())
