import { readFile } from "../../utils"

const input = readFile("2023", "day-11", "input.txt")
const universe: string[][] = input
  .split("\n")
  .filter((row) => row)
  .map((row) => row.split(""))

function isNoGalaxyContainedRow(rowIndex: number, universe: string[][]): boolean {
  return universe[rowIndex].every((space) => space === ".")
}

function isNoGalaxyContainedCol(colIndex: number, universe: string[][]): boolean {
  return universe
    .map((row) => row[colIndex])
    .flat(Infinity)
    .every((space) => space === ".")
}

function expandUniverse(universe: string[][]): string[][] {
  const clonedUniverse = structuredClone(universe)
  for (let row = 0; row < clonedUniverse.length; row++) {
    if (isNoGalaxyContainedRow(row, clonedUniverse)) {
      clonedUniverse.splice(
        row,
        0,
        Array.from({ length: clonedUniverse[0].length }).map(() => ".")
      )
      row++
    }
  }
  for (let col = 0; col < clonedUniverse[0].length; col++) {
    if (isNoGalaxyContainedCol(col, clonedUniverse)) {
      for (let row = 0; row < clonedUniverse.length; row++) {
        clonedUniverse[row].splice(col, 0, ".")
      }
      col++
    }
  }
  return clonedUniverse
}

function getGalaxiesPointFromUniverse(universe: string[][]): number[][] {
  const galaxies: number[][] = []
  for (let row = 0; row < universe.length; row++) {
    for (let col = 0; col < universe[0].length; col++) {
      if (universe[row][col] === "#") {
        galaxies.push([row, col])
      }
    }
  }
  return galaxies
}

function getDistanceFromTwoGalaxies(firstGalaxyPoint: number[], secondGalaxyPoint: number[]): number {
  return Math.abs(firstGalaxyPoint[0] - secondGalaxyPoint[0]) + Math.abs(firstGalaxyPoint[1] - secondGalaxyPoint[1])
}

function getPart1Result() {
  const expandedUniverse = expandUniverse(universe)
  const galaxies = getGalaxiesPointFromUniverse(expandedUniverse)
  let total = 0

  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      total += getDistanceFromTwoGalaxies(galaxies[i], galaxies[j])
    }
  }

  return total
}

console.log("firstResult: ", getPart1Result())

function getDistanceFromOlderGalaxies(firstGalaxyPoint: number[], secondGalaxyPoint: number[], universe: string[][]): number {
  const startRow = Math.min(firstGalaxyPoint[0], secondGalaxyPoint[0]) + 1
  const endRow = Math.max(firstGalaxyPoint[0], secondGalaxyPoint[0])
  const startCol = Math.min(firstGalaxyPoint[1], secondGalaxyPoint[1]) + 1
  const endCol = Math.max(firstGalaxyPoint[1], secondGalaxyPoint[1])
  let rowDistance = 0
  let colDistance = 0
  for (let i = startRow; i <= endRow; i++) {
    rowDistance += isNoGalaxyContainedRow(i, universe) ? 1000000 : 1
  }
  for (let i = startCol; i <= endCol; i++) {
    colDistance += isNoGalaxyContainedCol(i, universe) ? 1000000 : 1
  }
  return rowDistance + colDistance
}

function getPart2Result() {
  const galaxies = getGalaxiesPointFromUniverse(universe)
  let total = 0

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      total += getDistanceFromOlderGalaxies(galaxies[i], galaxies[j], universe)
    }
  }

  return total
}

console.log('secondResult: ', getPart2Result())

