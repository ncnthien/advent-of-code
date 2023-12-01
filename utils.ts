import {readFileSync} from "fs";
import * as process from "process";
import * as path from 'path';

const adventOfCodePath = {
    '2023': {
        'day-1': '/2023/day-1'
    }
}

export const readFile = (year: string, day: string, inputFileName: string) => {
    return readFileSync(path.join(process.cwd(), adventOfCodePath[year][day], inputFileName), { encoding: 'utf-8' })
}
