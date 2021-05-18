type Category = { [category: string]: string[] }

function parseCategories(configText: string | null): Category {
  let categoryType = ""
  const categories: Category = {}
  const lines = configText?.split("\n")

  lines?.forEach((line: string) => {
    if (isCategoryType(line)) {
      categoryType = getCategoryType(line)
      categories[categoryType] = []
    } else if (line.trim() !== "") {
      categories[categoryType].push(line)
    }
  })

  return categories
}

function isCategoryType(line: string): boolean {
  if (line.length > 0) {
    return line[0] === "[" && line[line.length - 1] === "]"
  }
  return false
}

function getCategoryType(line: string): string {
  return line.slice(1, line.length - 1)
}

export { parseCategories }
