import { readFile } from "../../utils"

type Recipe = {
  destination: number
  source: number
  length: number
}

const input = readFile("2023", "day-5", "input.txt")
const [seedsString, ...recipeString] = input.split("\n\n")

function convertRecipeStringToRecipes(recipeString: string): Recipe[] {
  const [, ...recipesLine] = recipeString.split("\n")
  return recipesLine.map((line) => {
    const [destination, source, length] = line.split(" ").map(Number)
    return { destination, source, length }
  })
}

function convertSourceToDestination(convertedSource: number, recipes: Recipe[]) {
  const matchRecipe = recipes.find((recipe) => {
    return convertedSource - recipe.length < recipe.source && convertedSource >= recipe.source
  })

  return matchRecipe ? matchRecipe.destination + convertedSource - matchRecipe.source : convertedSource
}

const [
  seedToSoilRecipe,
  soilToFertilizerRecipe,
  fertilizerToWaterRecipe,
  waterToLightRecipe,
  lightToTemperatureRecipe,
  temperatureToHumidityRecipe,
  humidityToLocationRecipe
] = recipeString.map(convertRecipeStringToRecipes)

function convertSeedToLocation(seed: number) {
  const soil = convertSourceToDestination(seed, seedToSoilRecipe)
  const fertilizer = convertSourceToDestination(soil, soilToFertilizerRecipe)
  const water = convertSourceToDestination(fertilizer, fertilizerToWaterRecipe)
  const light = convertSourceToDestination(water, waterToLightRecipe)
  const temperature = convertSourceToDestination(light, lightToTemperatureRecipe)
  const humidity = convertSourceToDestination(temperature, temperatureToHumidityRecipe)
  const location = convertSourceToDestination(humidity, humidityToLocationRecipe)
  return location
}

const seeds = seedsString.split(": ")[1].split(" ").map(Number)

const firstResult = Math.min(...seeds.map(convertSeedToLocation))

console.log("firstResult: ", firstResult)

// Part 2
function seedsToSeedsNumber(seeds: number[]) {
  let min = convertSeedToLocation(seeds[0])

  for (let i = 0; i < seeds.length; i += 2) {
    const startSeedNumber = seeds[i]
    const length = seeds[i + 1]
    const endSeedNumber = startSeedNumber + length - 1
    for (let seedNumber = startSeedNumber; seedNumber <= endSeedNumber; seedNumber++) {
      const location = convertSeedToLocation(seedNumber)
      if (location < min) {
        min = location
      }
    }
  }
  return min
}

const secondResult = seedsToSeedsNumber(seeds)

console.log("secondResult: ", secondResult)
// execution time: 16:30.246 (m:ss.mmm)
