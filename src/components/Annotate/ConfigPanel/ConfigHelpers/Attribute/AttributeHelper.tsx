export interface Attribute {
  name: string
  values: string[]
  targetEntity: string
  isGlobal: boolean
}
  
const ATTRIBUTE_CATEGORY = "attributes"
const DEFAULT_ATTRIBUTE = [] as Attribute[]

function parseAttributeValues(attributes: string[]): Attribute[] {
  const parsedAttributes: Attribute[] = []

  attributes.forEach((attribute: string) => {
    const attributeName = attribute.split("Arg:")[0].trim()
    const attributeValues = attribute.split("Value:")[1].trim().split("|")
    const targetEntity = attribute.split("Arg:")[1].split(",")[0].trim()
    const isGlobal = targetEntity.toLowerCase() === "<entity>"

    parsedAttributes.push({
        name: attributeName,
        values: attributeValues,
        targetEntity: targetEntity,
        isGlobal: isGlobal,
    })
  })

  return parsedAttributes
}

export {
  ATTRIBUTE_CATEGORY,
  DEFAULT_ATTRIBUTE,
  parseAttributeValues,
}
