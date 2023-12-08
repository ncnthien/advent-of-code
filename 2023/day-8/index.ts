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

function getResultPart1() {
  const nodeMap = convertNodesStringToNode(nodesString)
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
