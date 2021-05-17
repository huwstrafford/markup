import { useEffect, useState } from "react"

import "./ConfigPanel.css"

type Entity = string

interface Attribute {
  name: string
  values: string[]
  targetEntity: string
  isGlobal: boolean
}

type Category = { [category: string]: string[] }

const ATTRIBUTE_CATEGORY = "attributes"
const ENTITY_CATEGORY = "entities"
const ENTITY_COLOUR = ["#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe", "#008080", "#e6beff", "#9a6324", "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000075", "#808080", "#ffffff", "#000000"]

const DEFAULT_ENTITY = [] as Entity[]
const DEFAULT_ATTRIBUTE = [] as Attribute[]

function ConfigPanel(props: any): JSX.Element {
  const configText = localStorage.getItem("configText")
  const [entities, setEntities] = useState(DEFAULT_ENTITY)
  const [attributes, setAttributes] = useState(DEFAULT_ATTRIBUTE)
  const [rendered, setRendered] = useState(false)
  const [activeEntity, setActiveEntity] = useState("")
  const categories = parseCategories(configText)

  useEffect(() => {
    if (rendered) {
      return
    } else if (categories[ENTITY_CATEGORY] && categories[ATTRIBUTE_CATEGORY]) {
      setEntities(categories[ENTITY_CATEGORY])
      setAttributes(parseAttributeValues(categories[ATTRIBUTE_CATEGORY]))
      setRendered(true)
    } else {
      props.setErrorMessage("You need to provide a valid config file. Read the docs for more info.")
    }
  }, [props, categories, rendered])

  return (
    <div className="config-panel">
      <div className="config-entities">
        {entities.map((entity: string, index: number) => {
          let configLabelClasses = "config-label"

          if (activeEntity !== entity) {
            configLabelClasses += " config-label-inactive"
          }

          return (
            <p className="config-value-row">
              <input
                type="radio"
                id={entity}
                name="entities"
                value={entity}
              />
              <label
                className={configLabelClasses}
                onClick={() => setActiveEntity(entity)}
                style={{ backgroundColor: ENTITY_COLOUR[index] }}
                htmlFor={entity}
              >
                {entity}
              </label>
            </p>
          )
        })}
      </div>

      <div className="config-attributes">
        {attributes.map((attribute: Attribute, index: number) => {
          const active = attribute.targetEntity === activeEntity
          let attributeClasses = ""

          if (active) {
            attributeClasses = ""
          } else {
            attributeClasses = "inactive-attribute"
          }


          return (
            <p className={attributeClasses}>
              {/* <MDBInput list={attribute.name + index} label={attribute.name} background size="sm" /> */}
              <input list={attribute.name + index} placeholder={attribute.name}/>
              <datalist id={attribute.name + index}>
                {attribute.values.map((value: string) => {
                  return <option value={value}>{value}</option>
                })}
              </datalist>
            </p>
          )
        })}
      </div>
    </div>
  )
}

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

export default ConfigPanel
