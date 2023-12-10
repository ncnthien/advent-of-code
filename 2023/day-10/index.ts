import { emit } from "process";
import { readFile } from "../../utils";

const input = readFile('2023', 'day-10', 'input.txt')
const matrix = input.split('\n').filter(line => line).map(line => line.split(''))

type Point = [row: number, col: number]

function getStartPoint(matrix: string[][]): Point {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 'S') return [row, col]
    }
  }
}

function getPossibleNextPoint(pipe: string, point: Point): [Point, Point] {
  const row = point[0]
  const col = point[1]

  if (pipe === '|') {
    return [[row - 1, col], [row + 1, col]]
  }

  if (pipe === '-') {
    return [[row, col - 1], [row, col + 1]]
  }

  if (pipe === 'L') {
    return [[row - 1, col], [row, col + 1]]
  }

  if (pipe === 'J') {
    return [[row - 1, col], [row, col - 1]]
  }

  if (pipe === '7') {
    return [[row, col - 1], [row + 1, col]]
  }

  if (pipe === 'F') {
    return [[row, col + 1], [row + 1, col]]
  }
}

function getPossibleNextPointOfStartPoint(point: Point, matrix: string[][]): [Point, Point] {
  const row = point[0]
  const col = point[1]

  const top: Point = [row - 1, col]
  const bottom: Point = [row + 1, col]
  const left: Point = [row, col - 1]
  const right: Point = [row, col + 1]

  const possiblePoints: Point[] = []

  if (['|', '7', 'F'].includes(matrix[top[0]][top[1]])) possiblePoints.push(top)
  if (['|', 'L', 'J'].includes(matrix[bottom[0]][bottom[1]])) possiblePoints.push(bottom)
  if (['-', 'L', 'F'].includes(matrix[left[0]][left[1]])) possiblePoints.push(left)
  if (['-', 'J', '7'].includes(matrix[right[0]][right[1]])) possiblePoints.push(right)

  return possiblePoints as [Point, Point]
}

function getPart1Result() {
  let count = 1
  const initPoint = getStartPoint(matrix)
  const [startPoint] = getPossibleNextPointOfStartPoint(initPoint, matrix)
  let currentPoint = startPoint
  let previousPoint = initPoint

  while (!(currentPoint[0] === initPoint[0] && currentPoint[1] === initPoint[1])) {
    let cache = [...previousPoint]
    previousPoint = [...currentPoint]
    currentPoint = getPossibleNextPoint(matrix[currentPoint[0]][currentPoint[1]], currentPoint).filter(point => !(point[0] === cache[0] && point[1] === cache[1]))[0]
    count++
  }

  return Math.ceil(count / 2)
}

console.log('firstResult: ', getPart1Result())


