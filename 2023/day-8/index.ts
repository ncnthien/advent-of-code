import { readFile } from "../../utils"

type NodeMap = Map<string, [string, string]>

const input = readFile("2023", "day-8", "input.txt")
const [commands, ...nodesString] = input.split("\n").filter((string) => string)

function convertNodesStringToNode(nodesString: string[]): NodeMap {
  const nodeMap: NodeMap = new Map()

  nodesString.forEach((nodeString: string) => {
    const [node, leavesString] = nodeString.split(" = ")
    const leaves = leavesString.match(/\w{3}/gi) as [string, string]
    nodeMap.set(node, leaves)
  })

  return nodeMap
}

const nodeMap = convertNodesStringToNode(nodesString)

function getResultPart1() {
  let current = 'AAA'
  let count = 0
  let index = 0

  while (true) {
    if (current === "ZZZ") return count

    current = nodeMap.get(current)[commands[index] === "L" ? 0 : 1]
    count++

    if (index === commands.length - 1) {
      index = 0
    } else {
      index++
    }
  }
}

console.log('firstResult: ', getResultPart1())

// Part 2
function getCountToZ(node: string) {
  let current = node
  let currentCount = 0
  let currentIndex = 0

  while (true) {
    if (current.endsWith('Z')) {
      return currentCount
    }
    current = nodeMap.get(current)[commands[currentIndex] === "L" ? 0 : 1]
    currentCount++

    if (currentIndex === commands.length - 1) {
      currentIndex = 0
    } else {
      currentIndex++
    }
  }
}

function getMutualCommonMultipleOfCounts(counts: number[]) {
  const clonedCounts = [...counts]
  clonedCounts.sort((a, b) => a - b)
  let mutualCommonMultiple = 0

  while (true) {
    mutualCommonMultiple += clonedCounts[0]
    const isMutualCommonMultipleValid = clonedCounts.every(count => mutualCommonMultiple % count === 0)
    if (isMutualCommonMultipleValid) return mutualCommonMultiple
  }
}

function getResultPart2() {
  const currents = Array.from(nodeMap.keys()).filter(node => node.endsWith('A'))
  const countToZOfCurrents = currents.map(getCountToZ)
  return getMutualCommonMultipleOfCounts(countToZOfCurrents)
}

console.log('secondResult: ', getResultPart2())
