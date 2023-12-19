import { readFile } from "../../utils"

const input = readFile("2023", "day-13", "input.txt")
const patterns = input.split("\n\n").map((line) => line.split("\n").filter((line) => line))

function getHorizontalPatternPoint(pattern: string[]) {
  for (let i = 1; i < pattern.length; i++) {
    if (pattern[i] !== pattern[i - 1]) continue

    let isValid = true
    for (let j = 0; j < i && i + j < pattern.length; j++) {
      if (pattern[i - 1 - j] !== pattern[i + j]) {
        isValid = false
        break
      }
    }

    if (isValid) return i * 100
  }

  return 0
}

function getVerticalPatternPoint(pattern: string[]) {
  const horizontalPattern: string[] = []

  for (let i = 0; i < pattern[0].length; i++) {
    let col = ""
    for (let j = pattern.length - 1; j >= 0; j--) {
      col += pattern[j][i]
    }
    horizontalPattern.push(col)
  }

  return getHorizontalPatternPoint(horizontalPattern) / 100
}

function getPart1Result() {
  return patterns.reduce((point, pattern) => {
    return point + (getVerticalPatternPoint(pattern) || getHorizontalPatternPoint(pattern))
  }, 0)
}

console.log("firstResult: ", getPart1Result())
