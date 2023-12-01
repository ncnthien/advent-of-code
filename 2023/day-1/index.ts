import { readFile } from '../../utils'

const input = readFile('2023', 'day-1','input.txt')
const lines = input.split('\n')

const getDigitNumberFromLine = (line: string) => {
    let first, last
    for (const char of line.split('')) {
        const number = Number(char)
        if (!isNaN(number)) {
            if (!first) {
                first = number
            }
                last = number
        }
    }
    return Number('' + first + last)
}

const firstResult = lines.reduce((total, line) => {
    return total + getDigitNumberFromLine(line)
}, 0)

console.log('firstResult: ', firstResult)

// Part 2
const digitDictionary = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
}

const reversedDigitDictionary = {
    eno: '1',
    owt: '2',
    eerht: '3',
    ruof: '4',
    evif: '5',
    xis: '6',
    neves: '7',
    thgie: '8',
    enin: '9',
}

const getFirstNumberInLine = (line: string): string => {
    return line.split('').find(char => !isNaN(Number(char)))
}

const replaceFirstNumberWithDigit = (line: string): string => {
    return line.replace(new RegExp(Object.keys(digitDictionary).join('|')), (matched) => {
        return digitDictionary[matched]
    })
}

const replaceLastNumberWithDigit = (line: string): string => {
    return line.split('').reverse().join('').replace(new RegExp(Object.keys(reversedDigitDictionary).join('|')), (matched) => {
        return reversedDigitDictionary[matched]
    })
}

const secondResult = lines.reduce((total, line) => {
    return total + parseInt(`${getFirstNumberInLine(replaceFirstNumberWithDigit(line))}${getFirstNumberInLine(replaceLastNumberWithDigit(line))}`)
}, 0)

console.log('secondResult: ', secondResult)
