import { readFile } from "../../utils"

type Matrix = string[][]

interface Zone {
  startX: number
  endX: number
  startY: number
  endY: number
}

const input = readFile("2023", "day-3", "input.txt")
const matrix = input.split("\n").map((line) => line.split(""))
const maxX = matrix[0].length - 1
const maxY = matrix.length - 1

function isNumber(char: string) {
  return !isNaN(parseInt(char))
}

function isSymbol(char: string) {
  return isNumber(char) || char !== "."
}

function getNumberInMatrix(matrix: Matrix, startX: number, y: number) {
  let number = ""
  for (let x = startX; x <= maxX; x++) {
    if (isNumber(matrix[y][x])) {
      number += matrix[y][x]
    } else {
      break
    }
  }
  return parseInt(number)
}

function isCoordinateInZone(zone: Zone, x: number, y: number) {
  const { startX, endX, startY, endY } = zone
  return x >= startX && x <= endX && y >= startY && y <= endY
}

function isSymbolSurrounded(matrix: Matrix, zone: Zone) {
  const { startX, endX, startY, endY } = zone

  for (let y = startY - 1; y <= endY + 1; y++) {
    for (let x = startX - 1; x <= endX + 1; x++) {
      if (isCoordinateInZone(zone, x, y) || !matrix[y]?.[x]) {
        continue
      }

      if (isSymbol(matrix[y][x])) {
        return true
      }
    }
  }
  return false
}

function getResultPart1(matrix: Matrix) {
  let total = 0

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (!isNumber(matrix[y][x])) {
        continue
      }

      const number = getNumberInMatrix(matrix, x, y)
      const numberLength = String(number).length
      const zone: Zone = {
        startX: x,
        endX: x + numberLength - 1,
        startY: y,
        endY: y
      }

      if (isSymbolSurrounded(matrix, zone)) {
        total += number
      }

      x += numberLength - 1
    }
  }
  return total
}

console.log("firstResult: ", getResultPart1(matrix))
