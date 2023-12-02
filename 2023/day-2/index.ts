import { readFile } from "../../utils";

const input = readFile('2023', 'day-2', 'input.txt')
const games = input.split('\n')
const limit = {
    red: 12,
    green: 13,
    blue: 14
}

type Turn = Record<string, number>

interface Game {
    ID: number
    turns: Turn[]
}

const isTurnPossible = (turn: Turn) => {
    return Object.entries(turn).every(([cube, quantity]) => quantity <= limit[cube])
}

const isGamePossible = (turns: Game['turns']) => {
    return turns.every(isTurnPossible)
}

const gameStringToGame = (game: string): Game => {
    const [gameIDString, turnsString] = game.split(': ')
    const gameID = Number(gameIDString.split(' ')[1])
    const turns: Turn[] = turnsString.split('; ').map(turnString => {
        const cubes = turnString.split(', ')
        return cubes.reduce<Turn>((result, cubeString) => {
            const [quantity, cube] = cubeString.split(' ')
            result[cube] = parseInt(quantity)
            return result
        }, {})
    })
    return {
        ID: gameID,
        turns
    }
}

const firstResult = games.reduce((total, gameString) => {
    const game = gameStringToGame(gameString)
    if (isGamePossible(game.turns)) {
        return total + game.ID
    }
    return total
}, 0)

console.log('firstResult: ', firstResult)

// Part 2
const getPowerOfGame = (game: Game): number => {
    return Object.values(game.turns.reduce((power, turn) => {
        Object.entries(turn).forEach(([cube, quantity]) => {
            if (quantity > power[cube]) {
                power[cube] = quantity
            }
        })
        return power
    }, { red: 1, green: 1, blue: 1})).reduce((total, quantity) => {
        return total * quantity
    }, 1)
}

const secondResult = games.reduce((total, gameString) => {
    const game = gameStringToGame(gameString)
    return total + getPowerOfGame(game)
}, 0)

console.log('secondResult: ', secondResult)
