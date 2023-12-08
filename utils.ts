import { readFileSync } from "fs"
import * as process from "process"
import * as path from "path"

const adventOfCodePath = {
  "2023": {
    "day-1": "/2023/day-1",
    "day-2": "/2023/day-2",
    "day-3": "/2023/day-3",
    "day-4": "/2023/day-4",
    "day-5": "/2023/day-5",
    "day-6": "/2023/day-6",
    "day-7": "/2023/day-7",
    "day-8": "/2023/day-8"
  }
}

export const readFile = (year: string, day: string, inputFileName: string) => {
  return readFileSync(path.join(process.cwd(), adventOfCodePath[year][day], inputFileName), { encoding: "utf-8" })
}
