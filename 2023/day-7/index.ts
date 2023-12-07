import { readFile } from "../../utils"

interface Hand {
  id: number
  cards: string
}

const input = readFile("2023", "day-7", "input.txt")
const handsString = input.split("\n").filter((string) => string)

const cardRank = {
  "2": 0,
  "3": 1,
  "4": 2,
  "5": 3,
  "6": 4,
  "7": 5,
  "8": 6,
  "9": 7,
  T: 8,
  J: 9,
  Q: 10,
  K: 11,
  A: 12
}

function getRankOfCards(cardString: string) {
  const cards = cardString.split("")
  const cardsSet = new Set(cards)

  if (cardsSet.size === 1) return 7

  if (cardsSet.size === 4) return 2

  if (cardsSet.size === 5) return 1

  const firstCard = cards[0]
  const firstCardQuantity = cards.filter((card) => card === firstCard).length

  if (cardsSet.size === 2) {
    if (firstCardQuantity === 1 || firstCardQuantity === 4) return 6

    if (firstCardQuantity === 2 || firstCardQuantity === 3) return 5
  }

  if (cardsSet.size === 3) {
    if (firstCardQuantity === 3) return 4

    if (firstCardQuantity === 2) return 3

    if (firstCardQuantity === 1) {
      const secondCard = cards[1]
      const secondCardQuantity = cards.filter((card) => card === secondCard).length

      if (secondCardQuantity === 2) return 3
      else return 4
    }
  }
}

function compareSameRankCards(firstCardString: string, secondCardString: string) {
  for (let i = 0; i < firstCardString.length; i++) {
    if (cardRank[firstCardString[i]] > cardRank[secondCardString[i]]) return 1
    if (cardRank[firstCardString[i]] < cardRank[secondCardString[i]]) return -1
  }
  console.log("this case is invalid")
  return 0
}

function compareCards(firstCardString: string, secondCardString: string) {
  const firstCardRank = getRankOfCards(firstCardString)
  const secondCardRank = getRankOfCards(secondCardString)

  if (firstCardRank === secondCardRank) return compareSameRankCards(firstCardString, secondCardString)
  if (firstCardRank > secondCardRank) return 1
  if (firstCardRank < secondCardRank) return -1
}

function getResultPart1() {
  const hands: Hand[] = handsString.map((handString) => {
    const [cardString, id] = handString.split(" ")
    return {
      cards: cardString,
      id: Number(id)
    }
  })

  hands.sort((firstHand, secondHand) => compareCards(firstHand.cards, secondHand.cards))

  return hands.reduce((acc, hand, index) => {
    return acc + hand.id * (index + 1)
  }, 0)
}

console.log("firstResult: ", getResultPart1())

// Part 2

const cardRankWithFakeJoker = {
  J: -1,
  "2": 0,
  "3": 1,
  "4": 2,
  "5": 3,
  "6": 4,
  "7": 5,
  "8": 6,
  "9": 7,
  T: 8,
  Q: 10,
  K: 11,
  A: 12
}

function isFakeableCards(cardsString: string) {
  return cardsString.includes("J")
}

function getRankOfFakeCards(cardsString: string) {
  const cardsSet = new Set(cardsString.split(""))
  let maxRank = Number.MIN_SAFE_INTEGER

  Array.from(cardsSet).forEach((card) => {
    const rankWithFakeCard = getRankOfCards(cardsString.replaceAll("J", card))
    if (rankWithFakeCard > maxRank) maxRank = rankWithFakeCard
  })

  return maxRank
}

function compareSameRankCardsWithFake({
  firstCardString,
  isFirstCardFakeable,
  secondCardString,
  isSecondCardFakeable
}: {
  firstCardString: string
  isFirstCardFakeable: boolean
  secondCardString: string
  isSecondCardFakeable: boolean
}) {
  const firstCardRankBoard = isFirstCardFakeable ? cardRankWithFakeJoker : cardRank
  const secondCardRankBoard = isSecondCardFakeable ? cardRankWithFakeJoker : cardRank
  for (let i = 0; i < firstCardString.length; i++) {
    if (firstCardRankBoard[firstCardString[i]] > secondCardRankBoard[secondCardString[i]]) return 1
    if (firstCardRankBoard[firstCardString[i]] < secondCardRankBoard[secondCardString[i]]) return -1
  }
  console.log("this case is invalid")
  return 0
}

function compareCardsWithFake(firstCardString: string, secondCardString: string) {
  const isFirstCardFakeable = isFakeableCards(firstCardString)
  const isSecondCardFakeable = isFakeableCards(secondCardString)
  const firstCardRank = isFirstCardFakeable ? getRankOfFakeCards(firstCardString) : getRankOfCards(firstCardString)
  const secondCardRank = isSecondCardFakeable ? getRankOfFakeCards(secondCardString) : getRankOfCards(secondCardString)

  if (firstCardRank === secondCardRank)
    return compareSameRankCardsWithFake({
      firstCardString,
      secondCardString,
      isFirstCardFakeable,
      isSecondCardFakeable
    })
  if (firstCardRank > secondCardRank) return 1
  if (firstCardRank < secondCardRank) return -1
}

function getResultPart2() {
  const hands: Hand[] = handsString.map((handString) => {
    const [cardString, id] = handString.split(" ")
    return {
      cards: cardString,
      id: Number(id)
    }
  })

  hands.sort((firstHand, secondHand) => compareCardsWithFake(firstHand.cards, secondHand.cards))

  return hands.reduce((acc, hand, index) => {
    return acc + hand.id * (index + 1)
  }, 0)
}

console.log("secondResult: ", getResultPart2())
