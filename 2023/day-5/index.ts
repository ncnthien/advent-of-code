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
