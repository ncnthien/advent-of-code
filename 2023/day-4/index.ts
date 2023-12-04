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

function getPointFromMatchCount(count: number) {
  if (count - 1 < 0) return 0
  return Math.pow(2, count - 1)
}

function getMatchCountFromCard(card: Card) {
  return card.winningNumbers.reduce((matchCount, number) => {
    if (card.numbers.includes(number)) {
      matchCount += 1
    }
    return matchCount
  }, 0)
}

function getResultPart1() {
  return cards.reduce((total, cardString) => {
    const card = cardStringToCard(cardString)
    return total + getPointFromMatchCount(getMatchCountFromCard(card))
  }, 0)
}

console.log("firstResult: ", getResultPart1())

// Part 2
const cardInstances = new Map<number, number>(
  Array.from({ length: cards.length }).map((_, index) => [index, 1])
)

function getResultPart2() {
  for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
    const card = cardStringToCard(cards[cardIndex])
    const matchCount = getMatchCountFromCard(card)
    const prizeInstances = cardInstances.get(cardIndex)

    for (
      let nextCardIndex = cardIndex + 1;
      nextCardIndex < cardIndex + matchCount + 1;
      nextCardIndex++
    ) {
      const currentCardInstances = cardInstances.get(nextCardIndex)
      cardInstances.set(nextCardIndex, currentCardInstances + prizeInstances)
    }
  }

  return Array.from(cardInstances.values()).reduce((total, instanceNumber) => {
    return total + instanceNumber
  }, 0)
}

console.log("secondResult: ", getResultPart2())
